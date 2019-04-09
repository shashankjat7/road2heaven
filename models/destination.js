var mongoose=require("mongoose");

var destSchema=new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author: {
		id:
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		},
		username: String
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "comment"
	}]
});
module.exports=mongoose.model("destination",destSchema);