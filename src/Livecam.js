import React, { Component } from "react";
import { timeConverter } from "./utils";
import "./livecam.css";
import loader from "./loading.gif";

class Livecam extends Component {
  renderLoading() {
    return (
      <div className="loaderContainer">
        <img src={loader} alt="loader" />
      </div>
    );
  }

  renderError() {
    return <div>"I'm sorry! Please try again."</div>;
  }

  renderLivecam() {
    const allLivecams = this.props.livecams.map(livecam => (
      <div key={livecam.title}>
        <img
          style={{ width: "100%" }}
          src={`https://images.webcams.travel/thumbnail/${livecam.id}.jpg`}
          alt={livecam.title}
        />
        <p>
          {livecam.city} / {livecam.country} <br />
          {timeConverter(livecam.time)}
        </p>
      </div>
    ));

    return (
      <div id="container">
        <figure id="slideshow">{allLivecams}</figure>
      </div>
    );
  }

  render() {
    if (this.props.loading) {
      return this.renderLoading();
    } else if (this.props.livecams) {
      return this.renderLivecam();
    } else {
      return this.renderError();
    }
  }
}

export default Livecam;
