import React, { Component } from "react";
import { liveCamSearch, showCam, subscribeToFlag } from "./api";
import Livecam from "./Livecam";
import { getHours, mod } from "./utils";

class LivecamContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    subscribeToFlag(bool => this.delayFlag(bool));
  }

  componentDidMount() {
    showCam(bool => this.flagOnOff(bool));
    liveCamSearch(livecams => {
      this.setState({ loading: false, livecams });
    }, this.props.match.params.hour);
    document.ontouchmove = function(event) {
      event.preventDefault();
    };
  }

  componentDidUpdate() {
    this.slideshow();
    this.reload();
  }

  componentWillUnmount() {
    clearInterval(this.slideshowinterval);
    clearInterval(this.reloadinterval);
  }

  slideshow() {
    const imgs = document.getElementById("slideshow").children;
    const interval = 15000;
    let currentPic = 0;
    imgs[currentPic].style.webkitAnimation = "fadey " + interval + "ms";
    imgs[currentPic].style.animation = "fadey " + interval + "ms";
    this.slideshowinterval = setInterval(() => {
      imgs[currentPic].removeAttribute("style");
      if (currentPic === imgs.length - 1) {
        currentPic = 0;
      } else {
        currentPic++;
      }
      imgs[currentPic].style.webkitAnimation = "fadey " + interval + "ms";
      imgs[currentPic].style.animation = "fadey " + interval + "ms";
    }, interval);
  }

  flagOnOff(bool) {
    const container = document.getElementById("container");
    if (bool === "1") {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  }

  delayFlag(bool) {
    let delay = null;
    const japan_hours = Math.floor(getHours() / 2);
    const hour = parseInt(this.props.match.params.hour, 10);
    if (bool === "1") {
      delay = 2 - japan_hours + hour;
    } else {
      delay = 8 - japan_hours + hour;
    }
    setTimeout(this.flagOnOff, mod(delay, 12) * 150, bool);
  }

  reload() {
    this.reloadinterval = setInterval(() => {
      window.location.reload();
    }, 1200000);
  }

  render() {
    return (
      <div id="container">
        <Livecam {...this.state} />
      </div>
    );
  }
}

export default LivecamContainer;
