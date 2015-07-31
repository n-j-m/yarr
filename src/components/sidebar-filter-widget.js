import { h } from "virtual-dom";
import { Observable } from "rx";

import { clicksByClass } from "../events";

function view() {
  return (
    <ul className="sidebar-controls">
      <li className="sidebar-control filter-posts data-filter-all">All</li>
      <li className="sidebar-control filter-posts active data-filter-unread">Unread</li>
      <li className="sidebar-control filter-posts data-filter-read">Read</li>
    </ul>
  );
}

export default function render() {
  let widgetClicks = clicksByClass("filter-posts")
    .map(ev => ev.target)
    .do(el => {
      document.querySelector(".filter-posts.active").classList.remove("active");
      el.classList.add("active");
    })
    .subscribe(() => {});

  return Observable
    .just(view());
}
