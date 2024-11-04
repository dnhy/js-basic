let user = {
  name: "John Smith",
  age: 35,
};

console.log(JSON.parse(JSON.stringify(user)));

let room = {
  number: 23,
};

let meetup = {
  title: "Conference",
  occupiedBy: [{ name: "John" }, { name: "Alice" }],
  place: room,
};

// 循环引用
room.occupiedBy = meetup;
meetup.self = meetup;

console.log(
  JSON.stringify(meetup, function replacer(key, value) {
    /* your code */
    if (key === "place" || key === "self") {
      return;
    }
    return value;
  }),
);
