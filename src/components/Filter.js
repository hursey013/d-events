import React, { Component } from "react";
import states from "../states.json";

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: []
    };
  }

  componentDidMount() {
    fetch("/api/v1/events/states")
      .then(res => res.json())
      .then(locations => this.setState({ locations }))
      .catch(err => console.log(err));
  }

  render() {
    const locations = this.state.locations;

    return (
      <div className="inline-block relative w-full">
        <select
          onChange={e => this.props.onUpdate({ filter: e.target.value })}
          className="block appearance-none w-full bg-white border border-grey-lighter hover:border-grey px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">View all</option>
          {locations.map(location => (
            <option value={location.state} key={location.state}>
              {states[location.state]}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    );
  }
}

export default Filter;
