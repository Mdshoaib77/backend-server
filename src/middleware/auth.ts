import type { NextFunction, Request, Response } from "express";
import  Jwt  from "jsonwebtoken";
import config from "../config";
const auth = ()=>{
    return async (req : Request,res : Response,next : NextFunction)=>{

    // console.log(req.headers.authorization);

    const token = req.headers.authorization;
    console.log(token);
    

    if(!token){
        res.status(401).json({
            success : false,
            message : "Unauthorized access!!",
        })
    }


    const decoded = Jwt.verify(token as string,config.secret as string);

    console.log(decoded);
    

    next();

};
}

export default auth