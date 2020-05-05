import React, { Component } from "react";
import "./NoBooks.css";
import notfound from "./notfound.png";

export default function NoBooks(props) {
  return (
    <div className="container">
      <div className="message-holder">
        <b>No Books Found</b>
      </div>

      <img className="not-found-image" src={notfound} />
    </div>
  );
}
