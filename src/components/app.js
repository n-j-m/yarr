import { h } from "virtual-dom";
import { Observable } from "rx";

import postsList from "./posts-list";
import sidebar from "./sidebar";

function view(postsListView, sidebarView) {
  return (
    <div id="container" className="container">
      <div className="surface">
        <div className="surface-container">
          <div className="content">
            <aside className="cover">{sidebarView}</aside>
            <div className="wrapper">
              <div className="wrapper-container">
                {postsListView}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function render() {
  return Observable
    .combineLatest(
      postsList(),
      sidebar(),
      view
    );
}
