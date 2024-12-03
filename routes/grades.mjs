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
// the show route is READ, but limiting to a specific entry
// in this case, we will use id to get a secific grase entry
router.get("/:id", async (req, res) => {
  // in the connection, rememeber rht we have already accessed the sample training db
  // now we are going to access the "grades" collection in that db
  let collection = await db.collection("grades");

  //define the query
  // in this, we are searching for a specific id
  let query;
  try {
    query = { _id: new ObjectId(req.params.id) };
    let results = await collection.findOne(query);
    if (!results) res.send("not found").status(404);
    else res.send(results).status(200);
  } catch (err) {
    res.send("not an id").status(400);
  }
  console.log(query);
});
export default router;
