import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req,res) => {
    try{
        const {name, email, password, address, phone} = req.body
        //validation
        if(!name){
            return res.send({error: "Name is required!!"})
        }
        if(!email){
            return res.send({error: "email is required!!"})
        }
        if(!password){
            return res.send({error: "password is required!!"})
        }
        if(!address){
            return res.send({error: "address is required!!"})
        }
        if(!phone){
            return res.send({error: "phone is required!!"})
        }
        //check user
        const existingUser = await userModel.findOne({email})
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message: "Already Registered Please Login"
            })
        }
        //register
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({name, email, phone, address, password:hashedPassword}).save()

        res.status(201).send({
            success:true,
            message:"user successfully registered",
            user
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Error in registration",
            error
        })
    }
};

//Login controller
export const loginController = async (req,res) => {
    try{
        const {email,password} = req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message: "Invalid email or password"
            })
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
            })
        }
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }
        //token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET_KEY, {
            expiresIn:"7d",
        });
        res.status(200).send({
            success:true,
            message: "Logged in Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "there is an error",
            error
        })
    }
};

export const testController = async (req,res) => {
    res.send("Protected Route");
}