import { Observable } from "rx";
import { h, diff, patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";

import app from "./app";
import render from "./renderer";

render(app(), document.getElementById("app"));
