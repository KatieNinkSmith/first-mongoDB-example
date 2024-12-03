import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/conn.mjs";

const router = express.Router();

// full CRUD functionality
// c - create -post
// r - read   -get
// u - update -out/patch
// d - delete - delete

// for read we usually do an index route and a show route
// index displays or gets many db items// show displays one, usually based on the id

// --------------------------------------------------
//                        all route
// --------------------------------------------------

// =========== get implements READ funtionality
// we want to be carefull with this get route
// because it could be a huge amount of data
// that is why we limit to 50 in this example
// if you wanted to either use pagination or
// somehow iterate through,
// you might want to use limit(num) and skip(num)
// ==== make sure you are using async and await
// because bd access requests are asynchronous,
// but we need that data before we move on
router.get("/", async (req, res) => {
  let collection = await db.collection("grades");
  let results = await collection.find({}).limit(50).toArray();

  if (!results) res.send("not found").status(404);
  else res.send(results).status(200);
});

export default router;
