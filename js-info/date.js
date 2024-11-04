let date = new Date(2012, 0, 3); // 3 Jan 2012
console.log(getWeekDay(date));
console.log(getLocalDay(date));

function getWeekDay(date) {
  const weekDays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  return weekDays[date.getDay()];
}

function getLocalDay(date) {
  const day = date.getDay();
  return day === 0 ? 7 : day;
}

let date2 = new Date(2015, 0, 2);

function getDateAgo(date, day) {
  let agoDate = new Date(date - day * 24 * 60 * 60 * 1000);
  console.log("agoDate :", agoDate.getDate() - 2);
  return agoDate.getDate();
}

console.log(getDateAgo(date2, 1)); // 1, (1 Jan 2015)
console.log(getDateAgo(date2, 2)); // 31, (31 Dec 2014)
console.log(getDateAgo(date2, 365)); // 2, (2 Jan 2014)

const dateCurr = new Date();
console.log("dateCurr :", dateCurr);
console.log("dateCurr :", +dateCurr);
console.log("dateCurr :", dateCurr.toString());
console.log("copy", new Date(dateCurr));

console.log(Date.parse("2012-01-26T13:51:50.417"));
console.log(Date.parse("2012-01-26T13:51:50.417+08:00"));

function getLastDayOfMonth(year, month) {
  //   let firstDay = new Date(year, month + 1, 1);
  //   firstDay.setDate(firstDay.getDate() - 1);

  let firstDay = new Date(year, month + 1, 0);

  return firstDay.getDate();
}

console.log(getLastDayOfMonth(2012, 1));

function getSecondsToday() {
  return (
    new Date().getHours() * 3600 +
    new Date().getMinutes() * 60 +
    new Date().getMinutes()
  );
}

function getPercentToday() {
  let now = new Date();

  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let tommorow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  const percent = (now - today) / (tommorow - today);
  console.log("percent :", percent);
  console.log("int", parseInt(percent * 100) / 100);
  return percent.toFixed(2) + "%";
}
console.log("getPercentToday(); :", getPercentToday());
console.log("getSecondsToday", getSecondsToday());

function getSecondsToTomorrow() {
  let now = new Date();

  let tommorow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return Math.round((tommorow - now) / 1000);
}
console.log(getSecondsToTomorrow());

function formatDate(date) {
  const now = new Date();
  const diff = now - date;

  function padTwo(num) {
    return num.toString().padStart(2, "0");
  }

  if (diff < 1000) {
    return "right now";
  } else if (diff < 60 * 1000) {
    return diff / 1000 + " sec. ago";
  } else if (diff < 60 * 60 * 1000) {
    return diff / 1000 / 60 + " min. ago";
  } else {
    const d = [
      padTwo(date.getDate()),
      padTwo(date.getMonth() + 1),
      padTwo(date.getFullYear()).substr(2, 2),
      padTwo(date.getHours()),
      padTwo(date.getMinutes()),
    ];

    return d.slice(0, 3).join(".") + " " + d.slice(3).join("");
  }
}
console.log(formatDate(new Date(new Date() - 1))); // "right now"

console.log(formatDate(new Date(new Date() - 30 * 1000))); // "30 sec. ago"

console.log(formatDate(new Date(new Date() - 5 * 60 * 1000))); // "5 min. ago"

// 昨天的日期，例如 31.12.16 20:00
console.log(formatDate(new Date(new Date() - 86400 * 1000)));
