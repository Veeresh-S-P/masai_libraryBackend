const {Router}=require("express");
const userRoute=Router()
const {auth}=require("../middlewares/auth.middleware")
const {userSignup,userLogin,userLogout}=require("../controllers/user.controller");




userRoute.post("/register",userSignup)
userRoute.post("/login",userLogin)
userRoute.post("/logout",auth,userLogout)


module.exports={userRoute}