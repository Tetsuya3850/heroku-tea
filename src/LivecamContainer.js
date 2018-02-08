import React, { Component } from "react";
import { liveCamSearch, showCam, subscribeToFlag } from "./api";
import Livecam from "./Livecam";
import { mod, getMinutes } from "./utils";

let socket_open = false;

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
    liveCamSearch((livecams, lHour) => {
      this.setState({ loading: false, livecams, lHour });
    }, this.props.match.params.hour);
  }

  componentDidUpdate() {
    this.slideshow();
    /*this.socketHandler();*/
    this.reload();
  }

  componentWillUnmount() {
    clearInterval(this.slideshowinterval);
    /*clearInterval(this.socketHandleInterval);*/
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

  socketHandler() {
    if (!socket_open && (getMinutes() < 15 || getMinutes() >= 56)) {
      subscribeToFlag(bool => this.delayFlag(bool));
      socket_open = true;
    }
    this.socketHandleInterval = setInterval(() => {
      if (!socket_open && (getMinutes() < 15 || getMinutes() >= 56)) {
        subscribeToFlag(bool => this.delayFlag(bool));
        socket_open = true;
      }
    }, 60000);
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
    if (bool === "1") {
      delay = 2.5 - this.state.lHour / 2;
    } else {
      delay = 9 - this.state.lHour / 2;
    }
    if (this.props.match.params.hour === "12") {
      delay += 1;
    }
    setTimeout(this.flagOnOff, mod(delay, 12) * 400, bool);
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
