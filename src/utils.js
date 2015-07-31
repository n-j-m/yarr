
export function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike, 0);
}

const monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

export function formatDate(date) {
  if (!date) {
    return "";
  }

  if (typeof date === "string") {
    date = new Date(date);
  }

  let day = date.getDate(),
    monthIndex = date.getMonth(),
    year = date.getFullYear();

  return `${day}, ${monthNames[monthIndex]}, ${year}`;
}

export function log(thing) {
  console.log(thing);
  return thing;
}
