const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/helperpartials");

hbs.registerHelper("currentyear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("heading", text => {
  return "MARBLES";
});

app.use((req, res, next) => {
  let log = `${new Date().toString()} :: ${req.method} :: ${req.url}`;
  console.log(log);
  fs.appendFileSync("server.log", `Logs :: ${log}\n`);
  next();
});

/* app.use((req, res, next) => {
  res.render("maintenance.hbs");
}); */

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home.hbs", {
    tweeter: "jeetendraOnTweeter",
    facebook: "jeetendraOnFacebook",
    instagram: "jeetendraOnInstagram"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs");
});

app.get("/help", (req, res) => {
  res.render("help.hbs");
});

app.listen(port, error => {
  if (error) {
    console.log("Error : ", error);
  } else {
	console.log("Server running at : ", port);
  }
});
