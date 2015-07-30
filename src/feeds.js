import { Observable } from "rx";
import { ajax } from "jquery";

let feedUrls = [
  "https://hacks.mozilla.org/category/es6-in-depth/feed/",
  "http://feeds.feedburner.com/JohnResig",
  "http://unisonweb.org/feed.xml"
];

function fetchFeed(url) {
  return ajax({
    url: `http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=30&q=${url}`,
    dataType: "jsonp"
  }).promise();
}

export function feeds() {
  return Observable
    .from(feedUrls)
    .flatMap(fetchFeed)
    .map(res => res.responseData.feed.entries);
}
