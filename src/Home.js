import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/livecams/1">1</Link>
          </li>
          <li>
            <Link to="/livecams/2">2</Link>
          </li>
          <li>
            <Link to="/livecams/3">3</Link>
          </li>
          <li>
            <Link to="/livecams/4">4</Link>
          </li>
          <li>
            <Link to="/livecams/5">5</Link>
          </li>
          <li>
            <Link to="/livecams/6">6</Link>
          </li>
          <li>
            <Link to="/livecams/7">7</Link>
          </li>
          <li>
            <Link to="/livecams/8">8</Link>
          </li>
          <li>
            <Link to="/livecams/9">9</Link>
          </li>
          <li>
            <Link to="/livecams/10">10</Link>
          </li>
          <li>
            <Link to="/livecams/11">11</Link>
          </li>
          <li>
            <Link to="/livecams/12">12</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;
