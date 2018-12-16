import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import EventList from "./EventList";
import Event from "./Event";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rsvps: this.getCookie()
    };

    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(values) {
    console.log(values);
    this.setState(values);
  }

  getCookie() {
    const cookie = this.props.cookies.get("rsvps", { doNotParse: true });
    return cookie ? JSON.parse(cookie) : [];
  }

  render() {
    return (
      <main className="w-full lg:w-3/4 p-8 lg:p-12 xl:max-w-2xl lg:flex-auto lg:overflow-auto">
        <h2 className="mb-4 font-normal leading-none">Upcoming events</h2>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <EventList
                {...props}
                filter={this.props.filter}
                rsvps={this.state.rsvps}
                cookies={this.props.cookies}
                onUpdate={this.onUpdate}
              />
            )}
          />
          <Route
            path="/events/:id"
            render={props => (
              <Event
                {...props}
                rsvps={this.state.rsvps}
                cookies={this.props.cookies}
                onUpdate={this.onUpdate}
              />
            )}
          />
        </Switch>
      </main>
    );
  }
}

export default Main;
