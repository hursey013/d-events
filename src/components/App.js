import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: ""
    };

    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(values) {
    this.setState(values, () => {
      if (this.props.location.pathname !== "/") this.props.history.push("/");
    });
  }

  render() {
    return (
      <>
        <Header onUpdate={this.onUpdate} />
        <Main filter={this.state.filter} cookies={this.props.cookies} />
      </>
    );
  }
}

export default withCookies(withRouter(App));
