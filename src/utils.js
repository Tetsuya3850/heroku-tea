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

export function localHourGetter(timestamp) {
  if (timestamp === 0) {
    return false;
  }
  const a = new Date(timestamp * 1000);
  return a.getHours();
}

export function calcLocalOffset() {
  const d = new Date();
  const tz = d
    .toString()
    .split("GMT+")[1]
    .split(" (")[0];

  return parseInt(tz, 10) * 36;
}

export function getHours() {
  const d = new Date();
  return d.getHours();
}

export function mod(n, m) {
  return (n % m + m) % m;
}

export function most_frequent(array) {
  if (array.length === 0) return null;
  var modeMap = {};
  var maxEl = array[0],
    maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    if (modeMap[el] === null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}
