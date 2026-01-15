const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchUser=require('../middleware/fetchUser');
const JWT_SECRET=process.env.JWT_SECRET;

//create user
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    // const user=new User(req.body)
    // await user.save();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "Sorry a user with this email already exists" });
      }
      const salt=await bcrypt.genSalt(10);
      const secPass=await bcrypt.hash(req.body.password,salt);
      user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // res.json({error:"Enter unique email"})
      // .then(user=>res.json(user)).catch(err=>{console.log(err);

      const data={
        user:{
            id:user.id
      }}
      const authToken=jwt.sign(data,JWT_SECRET);
      console.log(authToken);
      success=true;
    res.json({success, authToken})
    } catch (error) {
      console.error(error.message,"catch block");
      success=false;
      res.status(500).send("Some error occurred");
    }
  }
);

//Login
router.post("/login",[
    body("email").isEmail(),
    body("password","Password cannot be blank").exists()
],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()});
    }
    let success=false;
    const{email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
          success=false;
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }
        const data={
            user:{
                id:user.id
            }}
        
        const authToken=jwt.sign(data,JWT_SECRET);
        console.log(authToken);
        success=true;
        res.json({success, authToken});
            }

    catch(error){
        res.status(500).send("Internal Server Error");
    }
})

//GetUser
router.post("/getuser",fetchUser,async (req,res)=>{
    try{
      const userId=req.user.id;
      const user=await User.findById(userId).select("-password");
      res.send(user);
      console.log(user);
    }catch(error){
      res.status(500).send("Internal Server Error");
    }
})

module.exports = router;
