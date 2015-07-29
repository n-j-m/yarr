import { Observable } from "rx";
import { h } from "virtual-dom";

let render = () =>
  Observable
    .interval(1000)
    .map(n => n + 1)
    .startWith(0)
    .map(count => <span>{count}</span>);

export default render;
