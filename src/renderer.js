import {h, diff, patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";

export default function render(mainView$, baseDOMNode) {
  let view = null;
  let rootNode = null;

  function initialize(newView) {
    view = newView;
    rootNode = createElement(view);
    baseDOMNode.appendChild(rootNode);
  }

  function update(newView) {
    let patches = diff(view, newView);
    rootNode = patch(rootNode, patches);
    view = newView;
  }

  return mainView$
    .subscribe(
      newView =>
        view ?
          update(newView) :
          initialize(newView),
      error =>
        console.error("ERROR:", error)
    );
}
