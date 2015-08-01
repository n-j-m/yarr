import { Observable } from "rx";
import { ajax } from "jquery";

import { Feeds, Posts, reactiveTable } from "../db";

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

function addPost(post, feedUrl) {
  post.read = "false";
  post.publishedDate = new Date(post.publishedDate);
  post.feedUrl = feedUrl;
  return Posts.add(post);
}

function addFeed(feedUrl) {
  return Observable
    .of(feedUrl)
    .flatMap(fetchFeed)
    .flatMap(data => {
      let feed = data.responseData.feed;
      let entries = feed.entries;

      let addedFeed = Feeds.add({
        url: feed.feedUrl,
        name: feed.title,
        source: feed.link,
        description: feed.description
      });

      return Observable
        .fromPromise(addedFeed)
        .flatMap(() => Observable.from(entries))
        .flatMap(post => addPost(post, feed.feedUrl));
    });
}

// add default feeds
Observable
  .fromPromise(Feeds.count())
  .flatMap(count => Observable
    .from(count === 0 ? feedUrls : [])
  )
  .flatMap(addFeed)
  .subscribe(
    console.log.bind(console, "Successfully added"),
    console.error.bind(console, "Error while adding feed:")
  );

let feeds$ = Observable
  .merge(
    reactiveTable(Feeds, "creating"),
    reactiveTable(Feeds, "updating"),
    reactiveTable(Feeds, "deleting")
  )
  .startWith("")
  .flatMap(() => Feeds.toArray())
  .share();

export default { feeds$ };
