import React, { Component } from "react";
import EventListItem from "./EventListItem";

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    };

    this.update = this.update.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    document.title = "D Events | Upcoming events";

    this.getApi()
      .then(res => this.setState({ events: res }))
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filter !== this.props.filter) {
      this.getApi(this.props.filter)
        .then(res => this.setState({ events: res }))
        .catch(err => console.log(err));
    }
  }

  getApi = async filter => {
    const url = filter
      ? `/api/v1/events/all?location=${filter}`
      : "/api/v1/events/all";
    const res = await fetch(url);
    const body = await res.json();
    if (res.status !== 200) throw Error(body.message);
    return body;
  };

  update(value) {
    this.props.onUpdate({
      ...value
    });
  }

  handleLogOut() {
    this.props.cookies.remove("rsvps", { path: "/" });
    this.update({ rsvps: [] });
  }

  render() {
    const events = this.state.events;
    const rsvps = this.props.rsvps;

    return (
      <div>
        <div className={!rsvps.length > 0 ? "display-none" : ""}>
          <h3 className="inline-block mb-2 mr-1">My schedule</h3>
          <span className="text-sm">
            <span className="italic">Not you? </span>
            <a href="#" onClick={this.handleLogOut}>
              Log out
            </a>
          </span>
          <ul className="list-reset flex flex-wrap -mx-4 mb-8">
            {rsvps.map(rsvp => (
              <EventListItem key={rsvp.id} event={rsvp} rsvp={true} />
            ))}
          </ul>
          <h3 className="mb-2">More events</h3>
        </div>
        <ul className="list-reset flex flex-wrap -mx-4 mb-8">
          {events
            .filter(event => !rsvps.find(rsvp => event.id === rsvp.id))
            .map(event => (
              <EventListItem key={event.id} event={event} />
            ))}
        </ul>
      </div>
    );
  }
}

export default Events;
