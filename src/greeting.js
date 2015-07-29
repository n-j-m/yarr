import { h } from "virtual-dom";

import counter from "./counter";

let view = (counterView) => <h1>Hello World! {counterView}</h1>;

let render = () => counter().map(view);

export default render;
