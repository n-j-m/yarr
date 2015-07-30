import { Observable } from "rx";
import { h } from "virtual-dom";

function view() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-brand">
        <h2 className="sidebar-brand">Yarr</h2>
      </div>
    </div>
  );
}

export default function render() {
  return Observable
    .just(view());
}
