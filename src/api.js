import { livecamSeed, livecamOffset } from "./livecamSeed";
import { calcLocalOffset } from "./utils";
import openSocket from "socket.io-client";
const socket = openSocket("https://flag-tea.herokuapp.com/");

async function liveCamSearch(cb, hour) {
  try {
    const response = await fetch(
      `https://webcamstravel.p.mashape.com/webcams/list/webcam=${
        livecamSeed[hour]
      }?lang=en&show=webcams%3Aimage%2Clocation`,
      {
        headers: {
          "X-Mashape-Key": "7GrfNcOg3gmshkB1n6TPEVEjj6dip1YH8f6jsnWquxtWbig7ZK"
        }
      }
    );
    const json = await response.json();
    const localOffset = calcLocalOffset();
    const livecams = [];
    json.result.webcams.forEach(function(webcam) {
      const livecam = {
        id: webcam.id,
        city: webcam.location.city,
        country: webcam.location.country,
        title: webcam.title,
        time: webcam.image.update + livecamOffset[hour] - localOffset
      };
      livecams.push(livecam);
    });
    cb(livecams);
  } catch (err) {
    console.log(err);
  }
}

async function showCam(success) {
  try {
    const show = await fetch("https://flag-tea.herokuapp.com/flag");
    const bool = await show.json();
    success(bool);
  } catch (err) {
    console.log(err);
  }
}

function subscribeToTimer(cb) {
  socket.on("flag", bool => cb(bool));
  socket.emit("subscribeToFlag", 8000);
}

const Client = { liveCamSearch, showCam, subscribeToTimer };
export default Client;
