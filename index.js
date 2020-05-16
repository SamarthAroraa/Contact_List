const express = require("express");
const path = require("path");
const app = express();
const db = require("./config/mongoose");
const Contact = require("./models/contact");
const port = 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

app.get("/", function (req, res) {
  //   console.log(req);

  Contact.find({}, function (err, contacts) {
    if (err) {
      // console.log("")
      console.log("Error in creating contact!");
      return;
    } else {
      return res.render("home", {
        title: "My Contact Page",
        contact_list: contacts,
      });
    }
  });
  // return res.render("home", {
  //   title: "My Contact Page",
  //   contact_list: contactList,
  // });
});

//delete contact

app.get("/delete-contact/:id", function (req, res) {
  // console.log(req.params);
  let id = req.params.id;
  console.log(id);
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("Error in deleting contact");
      return;
    }
  });
  return res.redirect("back");
});
app.post("/create", function (req, res) {
  // console.log(req.body);
  // contactList.push(req.body);
  Contact.create(req.body, function (err, newcontact) {
    if (err) {
      console.log("Error in creating contact!");
      return;
    } else {
      console.log("***********", newcontact);
      return res.redirect("back");
    }
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("server running on:", port);
  }
});
