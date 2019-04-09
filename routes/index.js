var express=require("express");
var router=express.Router();
var passport=require("passport");
var user=require("../models/user");

//the home page
router.get("/",function(req,res){
	res.render("homePage");
});

//show register form
router.get("/register",function(req,res){
	res.render("register");
});

//signup logic
router.post("/register",function(req,res){
	var newUser=new user({username: req.body.username});
	user.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			res.render("register");
			}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/destinations");
		})
	})
})

//show login form
router.get("/login",function(req,res){
	res.render("login");
})

//login logic
router.post("/login",passport.authenticate("local",{
	successRedirect: "/destinations",
	failureRedirect: "/login"
}),function(req,res){
});

//middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
//logout
router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/destinations");
})


module.exports=router;