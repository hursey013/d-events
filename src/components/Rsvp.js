import React, { Component } from "react";

class Rsvp extends Component {
  render() {
    return (
      <form
        className="w-full lg:w-1/2 p-4 mb-8"
        onSubmit={this.props.handleSubmit}
      >
        <h3 className="font-semibold mb-4">Will you join us?</h3>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full lg:w-1/2 px-2 mb-4">
            <label className="label mb-2" htmlFor="grid-first-name">
              First Name
            </label>
            <input
              className="input focus:outline-none focus:border-grey"
              id="grid-last-name"
              name="first_name"
              type="text"
            />
          </div>
          <div className="w-full lg:w-1/2 px-2 mb-4">
            <label className="label mb-2" htmlFor="grid-last-name">
              Last Name
            </label>
            <input
              className="input focus:outline-none focus:border-grey"
              id="grid-last-name"
              name="last_name"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full px-2 mb-4">
            <label className="label mb-2" htmlFor="grid-email">
              Email address
            </label>
            <input
              className="input focus:outline-none focus:border-grey"
              id="grid-email"
              name="email"
              type="email"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 mb-8">
          <div className="w-full lg:w-1/2 px-2 mb-4">
            <label className="label mb-2" htmlFor="grid-phone">
              Phone number
            </label>
            <input
              className="input focus:outline-none focus:border-grey"
              id="grid-phone"
              name="phone"
              type="tel"
            />
          </div>
          <div className="w-full lg:w-1/2 px-2 mb-4">
            <label className="label mb-2" htmlFor="grid-postal-code">
              Zip code
            </label>
            <input
              className="input focus:outline-none focus:border-grey"
              id="grid-postal-code"
              name="postal_code"
              type="text"
            />
          </div>
        </div>
        <button className="w-full p-4 hover:bg-red-dark bg-red text-grey-lightest">
          RSVP
        </button>
      </form>
    );
  }
}

export default Rsvp;
