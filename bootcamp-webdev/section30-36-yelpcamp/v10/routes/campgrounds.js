// ROUTE /campground

var express = require("express")
var router = express.Router()

// models
var Campground = require("../models/campground")
var Comment = require("../models/comment")

// middleware
var middleware = require("../middleware")
// specifying only the directory will assume that index.js is used

// ===================
// Campgrounds Routes
// ===================

// INDEX - show all campgrounds
router.get('/', function(req, res) {
    // identify user
    console.log(req.user)
    // generate page
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err)
        } else {
            res.render('campgrounds/index', {campgrounds:allCampgrounds, currentUser: req.user})
        }
    })
})

// CREATE - add new to database
router.post('/', middleware.isLoggedIn, function(req, res) {
    // Get data from form and save in variables
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = { name: name, image: image, description: description, author: author }
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err)
        } else {
            // Redirect back to campgrounds page
            console.log(newlyCreated)
            res.redirect('/campgrounds')
        }
    })
})


// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground})
    })
}) 

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
    // redirect somewhere
    //res.send("You reached the put route!")
})

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds")
        }
    })
})

// NEW - show form to add new
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new')
})

// SHOW - display a single campground
router.get('/:id', function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
            console.log(foundCampground)
            res.render('campgrounds/show', {campground: foundCampground})
        }
    })
})

module.exports = router
