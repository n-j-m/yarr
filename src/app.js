import { h } from "virtual-dom";

import greeting from "./greeting";

let render = () =>
  greeting()
    .map(greetingView =>
      <div className="jumbotron">{greetingView}</div>
    );

export default render;
