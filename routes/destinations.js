var express=require("express");
var router=express.Router();
var destination=require("../models/destination");

//index route
router.get("/",function(req,res){
	destination.find({},function(err,destinations){
	if(err){
		console.log(err);
	}else{
			res.render("destinations/index",{roads:destinations, currentUser: req.user});

	}
})
})
 //add a new destination
 router.get("/new",isLoggedIn,function(req,res){
 	res.render("destinations/new");
 });

 router.get("/:id",function(req,res){
 	
 	destination.findById(req.params.id).populate("comments").exec(function(err,foundDest){
 		if(err){
 			console.log(err);
 		}else{
 			//console.log(foundDest);
 			res.render("destinations/show",{destination: foundDest});
 		}
 		
 	});
 });
 //post route
 router.post("/",isLoggedIn,function(req,res){
 	var newD=req.body.newName;
 	var newI=req.body.newImage;
 	var author={
 		id: req.user._id,
 		username: req.user.username
 	}
 	var newDestination={name: newD,image: newI,author: author};
 	destination.create(newDestination,function(err,dest){
 		if(err){
 			console.log(err);
 		}else{
 			 	res.redirect("/destinations");

 		}
 	})

 })

 //middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

 module.exports=router;