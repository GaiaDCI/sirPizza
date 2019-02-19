const express = require("express");
const router = express.Router();

const pizza = require("../controllers/pizzaController.js");
const upload = require("../handler/multer");
const passport = require("passport");

router.get("/", pizza.home);
router.get("/list", pizza.list);
router.get("/search", pizza.search);
router.get("/create", pizza.create);
router.post("/save", upload.single("picturePizza"), pizza.save);
router.get("/show/:id", pizza.show);
router.get("/edit/:id", pizza.edit);
router.post("/update/:id", pizza.update);
router.post("/delete/:id", pizza.delete);

router.get("/secret", isLoggedIn, function(req, res) {
  res.render("secret");
});

// Auth Routes
router.get("/register", function(req, res) {
  res.render("register");
});

// Login Routes
router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/register", function(req, res) {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        return res.render("register");
      } //user stragety
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secret"); //once the user sign up
      });
    }
  );
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
  }),
  function(req, res) {
    res.send("User is " + req.user.id);
  }
);

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
