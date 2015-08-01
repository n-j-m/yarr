import { h } from "virtual-dom";
import { Observable } from "rx";

import { feeds$ } from "../models/feeds";
import { clicksByClass } from "../events";

function nodeView(feed, extraClasses) {
  return (
    <li className="sidebar-feedlist-item">
      <a className={extraClasses + " sidebar-feed"} href={feed.url}>
        {feed.name}
      </a>
    </li>
  );
}

function view(feedViews) {
  return (
    <ul className="sidebar-feedlist">
      {nodeView({url: "all-feeds", name: "All"}, "active")}
      {feedViews}
    </ul>
  );
}

export default function render() {

  clicksByClass("sidebar-feed")
    .do(ev => ev.preventDefault())
    .do(ev => {
      let activeEl = document.querySelector(".sidebar-feed.active");
      if (activeEl) {
        activeEl.classList.remove("active");
      }

      ev.target.classList.add("active");
    });

  return feeds$
    .startWith([])
    .map(feeds => feeds.map(nodeView))
    .map(view);
}
