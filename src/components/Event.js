import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import Rsvp from "./Rsvp";
import Thanks from "./Thanks";

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {}
    };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(value) {
    this.props.onUpdate({
      ...value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const eventId = this.state.event.id;
    const data = new FormData(event.target);

    data.append("event_id", eventId);

    this.postApi(data)
      .then(res => {
        this.setCookies();
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getApi()
      .then(res => {
        this.setState({ event: res });
        document.title = `D Events | ${this.state.event.name}`;
      })
      .catch(err => console.log(err));
  }

  getApi = async () => {
    const id = parseInt(this.props.match.params.id, 10);
    const res = await fetch(`/api/v1/events?id=${id}`);
    const body = await res.json();
    if (res.status !== 200) throw Error(body.message);
    return body[0];
  };

  postApi = async data => {
    const res = await fetch("/api/v1/events/rsvp", {
      method: "POST",
      body: data
    });
    const body = await res.json();
    return body;
  };

  setCookies = () => {
    const cookies = this.props.cookies;
    const prevCookieJson = cookies.get("rsvps", { doNotParse: true });
    const prevCookie = prevCookieJson ? JSON.parse(prevCookieJson) : [];
    prevCookie.push(this.state.event);
    const nextCookie = JSON.stringify(prevCookie);
    cookies.set("rsvps", nextCookie, { path: "/" });
    this.update({ rsvps: prevCookie });
  };

  render() {
    const event = this.state.event;
    const rsvps = this.props.rsvps;
    const address = `${event.address1} ${event.address2} ${event.city}, ${
      event.state
    } ${event.postal_code}`;
    const tz = event.timezone;

    return (
      <div className="max-w-3xl">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 p-4 mb-8 bg-white border rounded shadow">
            <h3 className="font-semibold mb-4">{event.name}</h3>
            <p className="mb-4">{event.description}</p>
            <h4 className="label mb-2">When</h4>
            <p className="mb-4">
              <Moment tz={tz} format="M/D/YYYY h:mm z">
                {event.start_date}
              </Moment>{" "}
              -{" "}
              <Moment tz={tz} format="M/D/YYYY h:mm z">
                {event.end_date}
              </Moment>
            </p>
            <h4 className="label mb-2">Where</h4>
            <p className="mb-4">
              {event.location_name}
              <br />
              {event.address1}
              <br />
              {event.address2 ? `${event.address2}` : ""}
              {event.city}, {event.state} {event.postal_code}
              <br />
              <a
                href={`http://maps.google.com/maps?q=${encodeURIComponent(
                  address
                )}`}
              >
                Google map and directions
              </a>
            </p>
          </div>
          {!rsvps.find(rsvp => event.id === rsvp.id) ? (
            <Rsvp eventId={event.id} handleSubmit={this.handleSubmit} />
          ) : (
            <Thanks />
          )}
        </div>
        <Link
          to="/"
          className="inline-flex items-center lg:-mx-4 text-blue-dark hover:text-blue-darker"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-current w-4 h-4 mr-2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 8 8 12 12 16" />
            <line x1="16" y1="12" x2="8" y2="12" />
          </svg>

          <span>Back to all events</span>
        </Link>
      </div>
    );
  }
}

export default Event;
