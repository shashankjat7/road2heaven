var express=require("express");
var router=express.Router({mergeParams: true});
var destination=require("../models/destination");
var comment=require("../models/comment");

//comments new
router.get("/new",isLoggedIn,function(req,res){
	//find destination by id
	destination.findById(req.params.id,function(err,destination){
		if(err){
			console.log(err)
		}else{
			res.render("comments/new",{destination: destination});
		}

	})
})

//comments create
router.post("/",isLoggedIn,function(req,res){
	//find destination by id
	destination.findById(req.params.id,function(err,destination){
		if(err){
			console.log(err);
			res.redirect("/destinations")
		}else{
			//create a comment
			comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}else{
					//add username
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					//save comment
					comment.save();
					//add a comment to the destination
					destination.comments.push(comment);
					destination.save();
					//redirect to the destination show page
					res.redirect("/destinations/"+destination._id);
				}
			})
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
