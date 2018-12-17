# Requirements

- python
- pip
- nodejs
- npm

# Launching the app

- Extract project zip file and navigate to the folder in your terminal
- To install all of the project's dependencies (including the requirements listed above), run:

```
vagrant up
```

- Upon completion, enter the server by running:

```
vagrant ssh
```

- This will put you in the `/vagrant` folder

## Initialize database

- We need to add a new `RSVP` database table. To do so, run the following commands:

```
cd api
```

```
python
```

```
>>> from api import db
>>> db.create_all()
```

- `Ctrl+D` to exit python.

## Starting the servers

### API

- Still within the `/vagrant/api` folder, run:

```
python api.py
```

- This will launch the python/flask API at `http://localhost:5000`

### Frontend

- In a new terminal window, run the following in the local project folder to launch another ssh session into Vagrant:

```
vagrant ssh
```

- Finally start the React development server by running this command in the `/vagrant` folder:

```
npm start
```

- This will launch the frontend at `http://localhost:3000`

_Leave both terminal windows open and running while using the application._

# About the app

The events app consists of a Flask API that allows various endpoints to interact with the provided sqlite database. The json responses provided by the API are then displayed on the frontend using React.

## Notable features

- Browse all events on the app's homepage, filterable by state
- View detailed information about any event
- RSVP to an event, which populates your contact information into the database
- View a saved state of events that you are attending on the app's homepage

## Next steps

Given the limited amount of time, there are a number of areas that I would improve upon.

### API

- Since at this point the `event` and `location` tables in the database were only being read and not modified, I did not create models for them. Ideally there would be a model defined for each to allow more operations to be preformed on them.
- Better support for large amount of database records. Right now I'm simply putting a `LIMIT` on the endpoint to return all events, but ideally it would support returning records in conjunction with pagination.
- Limit results to only future events. All of the sample events were backdated, but to limit the amount of events return I would likely set this to only show future events.
- Better error handling, validation, and data sanitization
- Tests

### Frontend

_Similarly..._

- Better error handling, validation, and data sanitization
- Tests

And also:

- Path to account creation. Right now I'm setting a cookie to save the state of event's that a user has RSVP'ed to, which works as a first step, but ideally a user would have the option to create an account so that they could log in again in the future, after the cookie has been cleared/expired.
- Better search/filtering capabilities
- Pagination for large amounts of records
- Reduce size of stylesheets - there are a lot of unused classes, so with time those could be pared down to a production size.
