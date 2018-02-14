import { livecamSeed, livecamOffset } from "./livecamSeed";
import { calcLocalOffset, timeConverter, localHourGetter } from "./utils";
import openSocket from "socket.io-client";

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
    let max_local_time = 0;

    for (const webcam of json.result.webcams) {
      const weather = await fetch(
        `https://weathernews.jp/api/api_obs.cgi?lat=${
          webcam.location.latitude
        }&lon=${webcam.location.longitude}`
      );
      const weather_json = await weather.json();
      if (weather_json.observation.WX > 400) {
        weather_json.observation.WX = 200;
      }
      const local_time =
        webcam.image.update + livecamOffset[hour] - localOffset;
      max_local_time = Math.max(local_time, max_local_time);
      const livecam = {
        id: webcam.id,
        city: webcam.location.city,
        country: webcam.location.country,
        title: webcam.title,
        time: timeConverter(local_time),
        weather: weather_json.observation.WX,
        temp: weather_json.observation.AIRTMP + " °C"
      };
      const latency = Date.now() - webcam.image.update * 1000;
      if (latency > 7200000) {
        livecam.temp = "--- °C";
      }
      livecams.push(livecam);
    }
    cb(livecams, localHourGetter(max_local_time));
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
  const socket = openSocket("https://flag-tea.herokuapp.com/");
  socket.on("flag", bool => cb(bool));
}
