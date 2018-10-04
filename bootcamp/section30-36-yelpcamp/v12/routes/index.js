var express = require("express")
var router = express.Router()
var passport = require("passport")
var User = require("../models/user")

// root route
router.get('/', function(req, res) {
    res.render('landing')
})

// ===========
// AUTH ROUTES
// ===========

// show register form
router.get("/register", function(req, res) {
    res.render("register")
})

// handle new registration
router.post("/register", function(req, res) {
    // make new user
    var newUser = new User({username: req.body.username})
    // register new user in database
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err)
            req.flash("error", err.name + ": " + err.message)
            return res.redirect("/register")
        }
        // authenticate this user in session
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to YelpCamp " + user.username)
            res.redirect("/campgrounds")
        })
    })
})

// show login form
router.get("/login", function(req, res) {
    res.render("login", {currentUser: req.user})
})

// handle login
// app.post("route", middleware, callback)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
        
})

// logout route
router.get("/logout", function(req, res) {
    req.logout()
    req.flash("success", "You have logged out")
    res.redirect("/campgrounds")
})

module.exports = router