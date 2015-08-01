import Dexie from "dexie";
import { Observable } from "rx";

let dexieDb = new Dexie("yarr");

dexieDb.version(1).stores({
  feeds: "url, name",
  posts: "link, title, author, publishedDate, categories, read, feedUrl"
});

dexieDb.open();

window.Posts = dexieDb.posts;
window.Feeds = dexieDb.feeds;

export const db = dexieDb;
export const Posts = dexieDb.posts;
export const Feeds = dexieDb.feeds;

export function reactiveTable(table, hookName) {
  return Observable
    .create(
      observer => {
        let dbListener = table.hook(
          hookName,
          (...args) => observer.onNext(...args)
        );

        return () => table.hook(hookName).unsubscribe(dbListener);
      }
    );
}

reactiveTable(db.feeds, "deleting")
  .flatMap(feedUrl => db.posts.where("feedUrl").equals(feedUrl).delete())
  .subscribe(
    x => console.log(`${x} posts deleted successfully in cascading delete operations`),
    console.error.bind(console, "Error while cascading Posts delete")
  );
