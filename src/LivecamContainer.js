import React, { Component } from "react";
import { liveCamSearch, showCam, subscribeToFlag } from "./api";
import Livecam from "./Livecam";
import { mod } from "./utils";

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
    if (bool === "1") {
      delay = 2 - this.state.lHour / 2;
    } else {
      delay = 9 - this.state.lHour / 2;
    }
    if (this.props.match.params.hour === "12") {
      delay += 1;
    }
    console.log(mod(delay, 12));
    setTimeout(this.flagOnOff, mod(delay, 12) * 300, bool);
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
