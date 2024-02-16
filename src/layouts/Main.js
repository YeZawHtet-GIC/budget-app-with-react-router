import React from "react";
//react-router-dom imports
import { Outlet, useLoaderData } from "react-router-dom";
//Helper Functions
import { FetchData } from "../Helpers";
//assets imports
import wave from "../assets/wave.svg";
//components imports
import Nav from "../components/Nav";
//Loader
export function MainLoader() {
  const userName = FetchData("userName");
  return { userName };
}

function Main() {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Nav userName={userName}/>
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="Wave Image"></img>
    </div>
  );
}

export default Main;
