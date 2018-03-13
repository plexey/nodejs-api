// user_routes.js

let ObjectID = require("mongodb").ObjectID;

module.exports = function(app, db) {
  app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection("users").findOne(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(item);
      }
    });
  });

  app.post("/users", (req, res) => {
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      age: req.body.age
    };
    db.collection("users").insert(user, (err, result) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection("users").remove(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send("user " + id + " deleted!");
      }
    });
  });

  app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      age: req.body.age
    };
    db.collection("users").update(details, user, (err, result) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(user);
      }
    });
  });
};
