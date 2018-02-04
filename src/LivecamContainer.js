import React, { Component } from "react";
import Client from "./api";
import Livecam from "./Livecam";

class LivecamContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    Client.subscribeToTimer((err, bool) => this.flagOnOff(bool));
  }

  componentDidMount() {
    Client.liveCamSearch(livecams => {
      this.setState({ loading: false, livecams });
    }, this.props.match.params.hour);
    document.ontouchmove = function(event) {
      event.preventDefault();
    };
  }

  componentDidUpdate() {
    this.slideshow();
    Client.showCam(bool => this.flagOnOff(bool));
    this.reload();
  }

  componentWillUnmount() {
    clearInterval(this.slideshowinterval);
    clearInterval(this.reloadinterval);
  }

  slideshow() {
    const imgs = document.getElementById("slideshow").children;
    const interval = 12000;
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

  reload() {
    this.reloadinterval = setInterval(() => {
      window.location.reload();
    }, 1200000);
  }

  render() {
    return <Livecam {...this.state} />;
  }
}

export default LivecamContainer;
