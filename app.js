var express=require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    passport=require("passport"),
    localStrategy=require("passport-local"),
	passportLocalMongoose=require("passport-local-mongoose"),
    mongoose=require("mongoose"),
    request=require("request"),
    destination=require("./models/destination"),
    comment=require("./models/comment"),
    user=require("./models/user"),
    seedDB=require("./seeds");

 var commentRoutes=require("./routes/comments"),
 	 destinationRoutes=require("./routes/destinations"),
 	 indexRoutes=require("./routes/index");

//seedDB();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
mongoose.connect("mongodb://localhost/road2heaven",{useNewUrlParser: true});

//passport config

app.use(require("express-session")({
	secret: "there is no secret",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//pass the current user to all pages
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	next();
});

//requiring routes
app.use("/",indexRoutes);
app.use("/destinations/:id/comments",commentRoutes);
app.use("/destinations",destinationRoutes);



//tell the server to listen on port 3001
app.listen(3000,function(){
	console.log("server is running on port 3000");
})