import { Observable } from "rx";

import { toArray } from "./utils";

let body = document.body;

let clicks$ = Observable.fromEvent(body, "click");

export function clicksByClass(className) {
  return clicks$
    .filter(ev => toArray(ev.target.classList).indexOf(className) >= 0);
}
