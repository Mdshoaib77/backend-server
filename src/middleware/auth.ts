// import type { NextFunction, Request, Response } from "express";
// import  Jwt, { type JwtPayload }  from "jsonwebtoken";
// import config from "../config";
// import { pool } from "../db";
// const auth = ()=>{
//     return async (req : Request,res : Response,next : NextFunction)=>{

//     // console.log(req.headers.authorization);

//     const token = req.headers.authorization;
//     console.log(token);
    

//     if(!token){
//         res.status(401).json({
//             success : false,
//             message : "Unauthorized access!!",
//         })
//     }


//     const decoded = Jwt.verify(token as string,config.secret as string) as JwtPayload;

//     const userData = await pool.query(`
        
        
//         SELECT * FROM users WHERE email=$1`, [decoded.email])

//         // console.log(userData);

//         const user = userData.rows[0];

//         // console.log(user);
        
//         if(userData.rows.length === 0){
//  res.status(404).json({
//             success : false,
//             message : "User Not Found!",
//         });
//         }


//         if(user.is_active){
//  res.status(403).json({
//             success : false,
//             message : "Forbidden!!",
//         });
//         }


//     next();

// };
// }

// export default auth

// import type { NextFunction, Request, Response } from "express";
// import  Jwt, { type JwtPayload }  from "jsonwebtoken";
// import config from "../config";
// import { pool } from "../db";

// const auth = (...roles : any)=>{

  
    

//     return async (req : Request,res : Response,next : NextFunction)=>{
//           console.log(roles);
// try {
    
//     // console.log(req.headers.authorization);

//     const token = req.headers.authorization;
//     console.log(token);
    

//     if(!token){
//        return res.status(401).json({
//             success : false,
//             message : "Unauthorized access!!",
//         });
//     }


//     const decoded = Jwt.verify(token as string,config.secret as string) as JwtPayload;

//     const userData = await pool.query(`
//         SELECT * FROM users WHERE email=$1`, [decoded.email]);

//         // console.log(userData);

//         const user = userData.rows[0];

//         // console.log(user);
//         if(userData.rows.length === 0){
//         return res.status(404).json({
//             success : false,
//             message : "User Not Found!",
//         });
//         }


//         if(!user?.is_active){
//         return res.status(403).json({
//             success : false,
//             message : "Forbidden!!",
//         });
//         }


//         // console.log("Auth Role: ", user.role);

//         // roles = ["admin", "agent"]
//         // user.role = "admin" | "user" | "Agent"

//         if(roles.length && roles.includes(user.role)){
// res.status(403).json({
//             success : false,
//             message : "Forbidden!, This role have no access!",
//         });
//         }
        

//         req.user = decoded

//     next();
// } catch (error) {
//     next(error);
// }

// };
// }

// export default auth;


import type { NextFunction, Request, Response } from "express";
import  Jwt, { type JwtPayload }  from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import type { ROLES } from "../types";





const auth = (...roles : ROLES[])=>{

    return async (req : Request,res : Response,next : NextFunction)=>{

        console.log(roles);

try {
    
    // console.log(req.headers.authorization);

    const token = req.headers.authorization;
    console.log(token);
    

    if(!token){
       return res.status(401).json({
            success : false,
            message : "Unauthorized access!!",
        });
    }


    const decoded = Jwt.verify(token as string,config.secret as string) as JwtPayload;

    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1`, [decoded.email]);

        // console.log(userData);

        const user = userData.rows[0];

        // console.log(user);

        if(userData.rows.length === 0){
        return res.status(404).json({
            success : false,
            message : "User Not Found!",
        });
        }


        if(!user?.is_active){
        return res.status(403).json({
            success : false,
            message : "Forbidden!!",
        });
        }


        // console.log("Auth Role: ", user.role);

        // roles = ["admin", "agent"]
        // user.role = "admin" | "user" | "agent"

        if(roles.length && !roles.includes(user.role)){
        return res.status(403).json({
            success : false,
            message : "Forbidden!, This role have no access!",
        });
        }
        

        req.user = decoded;

        next();

} catch (error) {
    next(error);
}

};
}

export default auth;