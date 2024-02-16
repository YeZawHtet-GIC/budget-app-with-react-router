import React from "react";
//react-router-dom imports
import { Form, NavLink } from "react-router-dom";
import { redirect } from "react-router-dom";
//assets imports
import logoMark from "../assets/logomark.svg";

//heroicons import
import { TrashIcon } from "@heroicons/react/24/solid";
//helpers.js
import { logoutAction } from "../actions/logout";

export default function Nav({ userName }) {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to Home Page">
        <img src={logoMark} alt="Logo Mark" height={30}></img>
        <span>HomeBudget</span>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(event) => {
            if (!window.confirm("Are you sure to delete all user data?"))
              // Show confirmation dialog when the form is submitted
              event.preventDefault(); // Prevent default form submission
          }}
        >
          <button type="submit" className="btn btn--warning btn-danger">
            <span>Delete User</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
}
