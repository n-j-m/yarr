import { Observable } from "rx";
import { h } from "virtual-dom";

import filterWidget from "./sidebar-filter-widget";
import fetchNAddWidget from "./sidebar-fetch-n-add-widget";
import feedListWidget from "./sidebar-feed-list";

function view(filterWidgetView, fetchNAddWidgetView, feedListWidgetView) {
  return (
    <div className="sidebar-container">
      <div className="sidebar-brand">
        <h2 className="sidebar-brand">Yarr</h2>
      </div>

      {filterWidgetView}
      {feedListWidgetView}
      {fetchNAddWidgetView}
    </div>
  );
}

export default function render() {
  return Observable
    .combineLatest(
      filterWidget(),
      fetchNAddWidget(),
      feedListWidget(),
      view
    );
}
