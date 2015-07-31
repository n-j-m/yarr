import { h } from "virtual-dom";
import { Observable } from "rx";

import { clicksByClass } from "../events";

function view(addFeedInputStyles) {
  return (
    <ul className="sidebar-controls">
      <li className="sidebar-control fetch-all-btn">Fetch All Feeds</li>

      <li className="sidebar-control new-feed-btn">
        Add New Feed
        <input className="new-feed-input" style={addFeedInputStyles} type="url" required />
      </li>
    </ul>
  );
}

export default function render() {
  let addFeedBtnClicks$ = clicksByClass("new-feed-btn")
    .startWith(false)
    .scan(acc => !acc)
    .map(show => show ?
      { display: "inline-block" } :
      { display: "none" }
    );

  return Observable
    .combineLatest(
      addFeedBtnClicks$,
      view
    );
}
