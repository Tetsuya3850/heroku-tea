export function timeConverter(timestamp) {
  if (timestamp === 0) {
    return false;
  }
  const a = new Date(timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
  var time = hour + " : " + min + " " + month + " " + date;
  return time;
}

export function calcLocalOffset() {
  const d = new Date();
  const tz = d
    .toString()
    .split("GMT+")[1]
    .split(" (")[0];

  return parseInt(tz, 10) * 36;
}
