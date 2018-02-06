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
  var counts = {};
  var compare = 0;
  var mostFrequent;
  for (var i = 0, len = array.length; i < len; i++) {
    var word = array[i];
    if (counts[word] === undefined) {
      counts[word] = 1;
    } else {
      counts[word] = counts[word] + 1;
    }
    if (counts[word] > compare) {
      compare = counts[word];
      mostFrequent = array[i];
    }
  }
  return mostFrequent;
}
