//requiring the library
const mongoose = require("mongoose");
//connecting with the server
mongoose.connect("mongodb://localhost/contacts_list_db");

//acquring the connection
const db = mongoose.connection;

//on encountering error
db.on("error", console.error.bind(console, "error connecting to db"));

//on succesful execution
db.once("open", function () {
  console.log("connected to the database");
});
