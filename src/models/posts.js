import { feeds$ } from "./feeds";

let posts$ = feeds$
  .map(feed => feed.entries);

export default { posts$ };
