import { Observable } from "rx";

import { Posts, reactiveTable } from "../db";

let posts$ = Observable
  .merge(
    reactiveTable(Posts, "creating"),
    reactiveTable(Posts, "updating"),
    reactiveTable(Posts, "deleting")
  )
  .startWith("")
  .flatMap(() => Posts.orderBy("publishedDate").reverse().toArray());

export default { posts$ };
