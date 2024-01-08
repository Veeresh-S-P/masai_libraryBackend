const {UserModel}=require("../models/user.model")
const {BlacklistModel}=require("../models/blacklist.model")
require("dotenv").config();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSignup=async (req,res)=>{

    let {email,password,isAdmin,name}=req.body

    try {
        let user=await UserModel.findOne({email});
        if(user){
            return res.status(409).send({ "success":false,"error": "already exist please login" })
        }
        
        const hash = bcrypt.hashSync(password, 6);
        let newUser=new UserModel({email,password:hash,isAdmin,name})
        console.log(newUser)
        await newUser.save()
        res.status(200).send({ "success": true, "message": "User registered successfully"})

    } catch (error) {
        res.status(400).send({"error":error.message})
    }
}


const userLogin = async (req, res) => {
    let { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(401).send({ success: false, error: 'Invalid Email' });
      }
  
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return res.status(500).send({ success: false, error: 'An error occurred during password comparison.' });
        }
  
        if (result) {
          const token = jwt.sign({ userID: user._id, isAdmin: user.isAdmin }, process.env.accesstoken, { expiresIn: '7d' });
          return res.status(200).send({ success: true, message: 'Login Successful', token: token });
        } else {
          return res.status(401).send({ success: false, error: 'Invalid Password' });
        }
      });
    } catch (error) {
      return res.status(500).send({ success: false, error: 'An error occurred while processing the request.' });
    }
  };

const userLogout=async (req,res)=>{
    let token=req.headers.token;
    try {
        const blacklistedToken = new BlacklistModel({ token });
        await blacklistedToken.save();
        return res.status(200).send({success:false,message:'Logged out successfully'});
    } catch (error) {
        res.status(400).send({"error":error.message})
    }

}

module.exports={userSignup,userLogin,userLogout}