const express = require("express");
const path = require("path");
const app = express();
const db = require("./config/mongoose");
const port = 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

app.get("/", function (req, res) {
  //   console.log(req);
  return res.render("home", {
    title: "My Contact Page",
    contact_list: contactList,
  });
});

//delete contact

var contactList = [];
app.get("/delete-contact/:phone", function (req, res) {
  // console.log(req.params);
  let phone = req.params.phone;
  let ind = contactList.findIndex((contact) => contact.phone == phone);
  if (ind != -1) {
    contactList.splice(ind, 1);
  }
  return res.redirect("back");
});
app.post("/create", function (req, res) {
  // console.log(req.body);
  contactList.push(req.body);
  return res.redirect("back");
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("server running on:", port);
  }
});
