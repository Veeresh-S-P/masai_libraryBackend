const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:[true,"email not present"],unique:true,trim:true},
    password:{type:String,required:[true,"password not present"],trim:true},
    isAdmin: {
        type:Boolean,
        required: true,
        default: false,
        enum: [true, false],
      }

},{
    versionKey:false,
    timestamps:true
})

const UserModel=mongoose.model("User",userSchema)

module.exports={UserModel}