from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import sqlite3
import os

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(basedir, 'data.db')
db = SQLAlchemy(app)


class Rsvp(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    email = db.Column(db.String(80))
    phone = db.Column(db.String(80))
    postal_code = db.Column(db.String(80))

    def __init__(self, event_id, first_name, last_name, email, phone, postal_code):
        self.event_id = event_id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone = phone
        self.postal_code = postal_code


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


# endpoint to add new rsvps


@app.route('/api/v1/events/rsvp', methods=['POST'])
def add_rsvp():
    event_id = request.form['event_id']
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    email = request.form['email']
    phone = request.form['phone']
    postal_code = request.form['postal_code']

    new_rsvp = Rsvp(event_id, first_name, last_name, email, phone, postal_code)

    db.session.add(new_rsvp)
    db.session.commit()

    return jsonify({
        'message': 'Created new RSVP'
    }), 201


# endpoint to list all events, optionally filtered by location


@app.route('/api/v1/events/all', methods=['GET'])
def events():
    query_parameters = request.args

    location = query_parameters.get('location')

    query = "SELECT events.id, events.name, locations.name AS location_name, locations.city, locations.state, events.start_date, locations.timezone FROM events INNER JOIN locations ON events.id=locations.event_id AND events.status='confirmed' AND events.visibility='public'"
    to_filter = []

    if location:
        query += ' WHERE locations.state=(?)'
        to_filter.append(location)

    query += ' ORDER BY events.start_date LIMIT 50;'

    conn = sqlite3.connect('data.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()
    results = cur.execute(query, to_filter).fetchall()

    return jsonify(results)


# endpoint for distinct list of event locations


@app.route('/api/v1/events/states', methods=['GET'])
def events_states():
    conn = sqlite3.connect('data.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()
    results = cur.execute(
        "SELECT DISTINCT locations.state FROM locations INNER JOIN events ON locations.event_id=events.id AND events.status='confirmed' AND events.visibility='public' ORDER BY locations.state;").fetchall()

    return jsonify(results)


# endpoint for event details, filtered by query param


@app.route('/api/v1/events', methods=['GET'])
def events_filter():
    query_parameters = request.args

    id = query_parameters.get('id')

    query = 'SELECT events.id, events.name, events.description, locations.name AS location_name, locations.address1, locations.address2, locations.city, locations.state, locations.postal_code, events.start_date, events.end_date, locations.timezone FROM events LEFT JOIN locations ON events.id=locations.event_id WHERE'
    to_filter = []

    if id:
        query += ' events.id=(?) AND'
        to_filter.append(id)
    if not (id):
        return abort(404)

    query = query[:-4] + ';'

    conn = sqlite3.connect('data.db')
    conn.row_factory = dict_factory
    cur = conn.cursor()
    results = cur.execute(query, to_filter).fetchall()

    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='5000')
