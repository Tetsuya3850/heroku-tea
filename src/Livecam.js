import React, { Component } from "react";
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
          src={`https://images.webcams.travel/preview/${livecam.id}.jpg`}
          alt={livecam.title}
        />
        <p>
          {livecam.city} / {livecam.country} <br />
          {livecam.time}
        </p>
      </div>
    ));

    return (
      <div>
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
