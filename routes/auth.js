const router = require('express').Router();
const User= require('../model/User');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const{registerValidation,loginValidation}=require('../validation');

router.post('/register',async (req,res) =>
{
    //lets validate
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //checking if email exists
    const emailExist= await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('email already exists');

    //hash password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
    
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
       
});
//saving the user 
try{
    const savedUser= await user.save();

    res.send({user: user._id});
}catch(err){

    res.status(400).send(err);

}
});


//LOGIN
router.post('/login',async (req,res) =>
{
    //lets validate
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user= await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email not found!');
    //password is correct or not
    const validPass=await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid password!');

    const token= jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token);
    res.send('logged in!');

});

module.exports=router;