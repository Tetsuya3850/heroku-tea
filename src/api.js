import { livecamSeed, livecamOffset } from "./livecamSeed";
import {
  calcLocalOffset,
  timeConverter,
  localHourGetter,
  most_frequent
} from "./utils";
import openSocket from "socket.io-client";
const socket = openSocket("https://flag-tea.herokuapp.com/");

export async function liveCamSearch(cb, hour) {
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
    const hours = [];
    json.result.webcams.forEach(function(webcam) {
      const local_time =
        webcam.image.update + livecamOffset[hour] - localOffset;
      const local_hour = localHourGetter(local_time);
      const livecam = {
        id: webcam.id,
        city: webcam.location.city,
        country: webcam.location.country,
        title: webcam.title,
        time: timeConverter(local_time)
      };
      livecams.push(livecam);
      hours.push(local_hour);
    });

    cb(livecams, most_frequent(hours));
  } catch (err) {
    console.log(err);
  }
}

export async function showCam(success) {
  try {
    const show = await fetch("https://flag-tea.herokuapp.com/flag");
    const bool = await show.json();
    success(bool);
  } catch (err) {
    console.log(err);
  }
}

export function subscribeToFlag(cb) {
  socket.on("flag", bool => cb(bool));
}
