import React from "react";

const Thanks = () => (
  <div className="w-full lg:w-1/2 p-4 mb-8 text-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-current w-1/4 h-1/4 my-8 text-green"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
    <h3>Thank you!</h3>
    <p className="italic">Your RSVP has been received</p>
  </div>
);

export default Thanks;
