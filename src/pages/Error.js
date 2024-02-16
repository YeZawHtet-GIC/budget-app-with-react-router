import React from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
//Heroicons
import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid";

export default function Error() {
  const error = useRouteError();
  const navigate=useNavigate();
  return (
    <div className="error">
      <h1>Uh oh! We've got a problem!</h1>
      <p>{error.message}</p>
      <div className="flex-md">
        <button className="btn btn-dark btn--dark" onClick={()=>{navigate(-1)}}>
          <ArrowUturnLeftIcon width={20}/>
          <span>Go Back</span>
        </button>
        <Link to="/" className="btn btn-dark btn--dark">
          <HomeIcon width={20} />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
}
