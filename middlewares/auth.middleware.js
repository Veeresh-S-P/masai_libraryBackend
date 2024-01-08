require("dotenv").config()
const {UserModel}=require("../models/user.model");
const {BlacklistModel}=require("../models/blacklist.model")
const jwt=require("jsonwebtoken");

const auth=async(req,res,next)=>{
    const token=req.headers.token;
    if(token){
        try {
           const isBlacklisted= await BlacklistModel.findOne({token});
           if(isBlacklisted){
            return res.status(401).send({"success":false,"error": "Token is Blacklisted, Session Expired,please login again"})
           }
           
           let  decodedToken = jwt.verify(token, process.env.accesstoken);
           
           req.body.userID=decodedToken.userID;
           req.body.isAdmin = decodedToken.isAdmin
                next()
        } catch (error) {
            res.status(400).send({"error":error.message})
        }
    }else{
        return res.status(400).send({ "success":false,"error": "please login first" })
    }

}



module.exports={auth}