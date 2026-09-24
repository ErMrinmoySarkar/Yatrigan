const userModel = require("../models/user.model");
const userService = require("../services/user.services");
const {validationResult} = require("express-validator");

module.exports.registerUser = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    let {fullname, email, password} = req.body;
    const hassPassword =  await userModel.hassPassword(password);

    const user = await userService.createUser({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password : hassPassword
    });

    const token = user.generateAuthToken(); //always call as an instans when creating new object.

    res.status(201).json({token,user});
}