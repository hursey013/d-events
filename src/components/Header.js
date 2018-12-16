import React, { Component } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";

class Header extends Component {
  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
  }

  update(value) {
    this.props.onUpdate({
      ...value
    });
  }

  render() {
    return (
      <header className="bg-image bg-cover bg-blue-darker text-grey-lightest w-full lg:w-1/4 p-8 lg:p-12 lg:flex-none">
        <div className="lg:max-w-sm">
          <h1 className="text-blue leading-none mb-4 lg:mb-12">
            <Link
              to="/"
              className="text-blue leading-none no-underline flex items-center"
            >
              <div className="rounded-full h-16 w-16 flex items-center justify-center mr-3 font-bold text-4xl border-6 border-blue">
                D
              </div>
              <span className="text-4xl font-normal">Events</span>
            </Link>
          </h1>
          <p className="text-lg mb-4 lg:mb-12">
            Every door knock, phone call, and text counts. Find an event near
            you to help get out the vote.
          </p>
          <div className="mb-4 lg:mb-12">
            <span className="block mb-2 text-sm uppercase">
              Find an event in your community
            </span>
            <Filter onUpdate={this.props.onUpdate} />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
