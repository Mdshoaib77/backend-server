import type { NextFunction, Request, Response } from "express";
import  Jwt, { type JwtPayload }  from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
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


    const decoded = Jwt.verify(token as string,config.secret as string) as JwtPayload;

    const userData = await pool.query(`
        
        
        SELECT * FROM users WHERE email=$1`, [decoded.email])

        // console.log(userData);

        const user = userData.rows[0];

        console.log(user);
        
        


    next();

};
}

export default auth