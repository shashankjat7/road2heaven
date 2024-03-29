var mongoose=require("mongoose");
var destination=require("./models/destination");
var comment=require("./models/comment");

var data=[
	{name: "icy bridge",
	image: "https://images.unsplash.com/photo-1549752448-38f4d94420f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
},
{
	name: "perfect date",
	image: "https://images.unsplash.com/photo-1549490148-237260354488?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
}

]
function seedDB(){

	//remove all destinations
	destination.remove({},function(err){
		if(err){
			console.log(err);
		}else{
			console.log("destinations removed");
			// add a few destinations
	    data.forEach(function(seed){
		destination.create(seed,function(err,destination){
			if(err){
				console.log(err);
			}else{
				console.log("created destinations");
				//create a comment
				comment.create({
					text: "this is a great place",
					author: "mr grinch"
				},function(err,comment){
					if(err){
						console.log(err);
					}else{
					destination.comments.push(comment);
					destination.save();
					console.log("created comment");
				}
				})
			}
		})
	})
		}
	});

	//add comments
}
module.exports=seedDB;