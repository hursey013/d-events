import React, { Component } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "./helpers";

class EventListItem extends Component {
  render() {
    const event = this.props.event;
    const rsvp = this.props.rsvp;
    const buttonClass = rsvp
      ? "w-1/2 p-2 border-4 border-green text-green font-semibold"
      : "w-1/2 p-2 group-hover:bg-red-dark bg-red text-grey-lightest";
    return (
      <li className="flex w-full sm:w-1/2 xl:w-1/3 mb-8 px-4">
        <Link
          to={`/events/${event.id}`}
          className="group w-full p-4 bg-white border rounded shadow hover:shadow-raised flex flex-col text-blue-dark no-underline transition hover:translateY-2px hover:text-blue-darker subpixel-antialiased group"
        >
          <h3 className="font-semibold">{event.name}</h3>
          <p className="flex-grow mb-4 text-grey-darker">
            <span className="block mb-2 text-grey-dark text-sm italic flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-current h-4 w-4 mr-1"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {formatDate(event.start_date, event.timezone)}
            </span>
            <strong>Join us: </strong>
            {event.location_name ? `${event.location_name} in ` : ""}
            {event.city}, {event.city}
          </p>
          <button className={buttonClass}>
            {rsvp ? "I'm attending!" : "RSVP"}
          </button>
        </Link>
      </li>
    );
  }
}

export default EventListItem;
