var express = require("express");
var router = express.Router();

const passport = require("passport");
const jwt = require("jsonwebtoken");

var User = require("../models/userb");

let data = require("../assets/data.json");

const firstMenu = data[0];

router.get("/resturant", function (_, res) {
  res.json(firstMenu);
});

router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
  }),
  async (req, res) => {
    let user = await User.retrieve(["id", req.user.id], false);
    const token = jwt.sign(
      {
        user: { email: user.email, id: req.user.id, role: user.role },
      },
      "justatemp"
    );
    res.json({ token });
  }
);

router.post(
  "/signup",
  passport.authenticate("signup", {
    session: false,
  }),
  async (req, res) => {
    User.retrieve(["id", req.user.id], false).then(async (user) => {
      const token = jwt.sign(
        {
          user: { email: user.email, id: req.user.id, role: req.user.role },
        },
        "justatemp"
      );
      res.json({ token });
    });
  }
);

module.exports = router;
