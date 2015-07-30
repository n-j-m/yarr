import Rx from "rx";

Rx.config.longStackSupport = true;

require("./styles/style.scss");

import app from "./components/app";
import render from "./renderer";

render(app(), document.getElementById("app"));
