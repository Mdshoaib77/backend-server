// // // import bcrypt from "bcryptjs";
// // // import { pool } from "../../db"
// // // import jwt from "jsonwebtoken"
// // // import config from "../../config";

// // // const loginUserIntoDB = async(payLoad : {
// // //     email : string,
// // //     password : string
// // // })=>{
// // //     const {email, password} = payLoad
// // //     // 1. Check if the user is exists
// // //     // 2.comapare the password
// // //     // 3.token geenrate

// // //     const userData = await pool.query(`
// // //         SELECT * FROM users WHERE email=$1

// // //         `,
    
// // //         [email],

// // //     );


// // //     if(userData.rows.length === 0){
// // //         throw new Error("Invalid credentials!")

// // //     }


// // //     const user = userData.rows[0];
   
// // //     const matchPassword = await bcrypt.compare(password, user.password);


    

// // //     if(!matchPassword){
// // //  throw new Error("Invalid credentials!")
// // //     }

// // //     // Generate Token

// // //     const jwtpayload = {
// // //         id : user.id,
// // //         name : user.name,
// // //         is_active : user.is_active,
// // //         email : user.email
// // //     }


// // //     const accessToken = jwt.sign(jwtpayload, config.secret as string,{expiresIn: "1d",});

// // //     return accessToken;


// // // }


// // // export const authService = {
// // //     loginUserIntoDB,
// // // }


// // import bcrypt from "bcryptjs";
// // import { pool } from "../../db"
// // import * as jwt from "jsonwebtoken"
// // import config from "../../config";

// // const loginUserIntoDB = async(payLoad : {
// //     email : string,
// //     password : string
// // })=>{

// //     const {email, password} = payLoad

// //     // 1. Check if the user is exists
// //     // 2.comapare the password
// //     // 3.token geenrate

// //     const userData = await pool.query(`
// //         SELECT * FROM users WHERE email=$1

// //         `,
    
// //         [email],

// //     );


// //     if(userData.rows.length === 0){

// //         throw new Error("Invalid credentials!")

// //     }


// //     const user = userData.rows[0];
   

// //     const matchPassword = await bcrypt.compare(password, user.password);


    

// //     if(!matchPassword){

// //         throw new Error("Invalid credentials!")

// //     }


// //     // JWT Secret check
// //     if(!config.secret){

// //         throw new Error("JWT secret is missing!")

// //     }


// //     // Generate Token

// //     const jwtpayload = {

// //         id : user.id,
// //         name : user.name,
// //         is_active : user.is_active,
// //         email : user.email

// //     }


// //     const accessToken = jwt.sign(
// //         jwtpayload,
// //         config.secret,
// //         {
// //             expiresIn: "1d",
// //         }
// //     );

// //     return accessToken;

// // }


// // export const authService = {
// //     loginUserIntoDB,
// // }


// import bcrypt from "bcryptjs";
// import { pool } from "../../db"
// import jwt from "jsonwebtoken"
// import config from "../../config";

// const loginUserIntoDB = async(payLoad : {
//     email : string,
//     password : string
// })=>{

//     const {email, password} = payLoad

//     // 1. Check if the user exists
//     // 2. compare password
//     // 3. generate token

//     const userData = await pool.query(`
//         SELECT * FROM users WHERE email=$1
//     `,
//     [email],
//     );


//     if(userData.rows.length === 0){
//         throw new Error("Invalid credentials!")
//     }


//     const user = userData.rows[0];


//     const matchPassword = await bcrypt.compare(password, user.password);


//     if(!matchPassword){
//         throw new Error("Invalid credentials!")
//     }


//     // JWT Secret check
//     if(!config.secret){
//         throw new Error("JWT secret is missing!")
//     }


//     // Generate Token
//     const jwtpayload = {
//         id : user.id,
//         name : user.name,
//         role : user.role,
//         is_active : user.is_active,
//         email : user.email
//     }


//     const accessToken = jwt.sign(
//         jwtpayload,
//         config.secret,
//         {
//             expiresIn: "1d",
//         }
//     );

//     const refreshToken = jwt.sign(
//         jwtpayload,
//         config.refresh_secret as string,
//         {
//             expiresIn: "1d",
//         }
//     );


//     return {
//         accessToken,refreshToken
//     };
// }


// export const authService = {
//     loginUserIntoDB,



import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDB = async(payLoad : {
    email : string,
    password : string
})=>{

    const {email, password} = payLoad;

    // 1. Check if the user exists
    // 2. compare password
    // 3. generate token

    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
    `,
    [email],
    );


    if(userData.rows.length === 0){
        throw new Error("Invalid credentials!");
    }


    const user = userData.rows[0];


    const matchPassword = await bcrypt.compare(password, user.password);


    if(!matchPassword){
        throw new Error("Invalid credentials!");
    }


    // JWT Secret check
    if(!config.secret){
        throw new Error("JWT secret is missing!");
    }


    // Generate Token
    const jwtpayload = {
        id : user.id,
        name : user.name,
        role : user.role,
        is_active : user.is_active,
        email : user.email
    };


    const accessToken = jwt.sign(
        jwtpayload,
        config.secret,
        {
            expiresIn: "1d",
        }
    );

    const refreshToken = jwt.sign(
        jwtpayload,
        config.refresh_secret as string,
        {
            expiresIn: "7d",
        }
    );


    return {
        accessToken,
        refreshToken,
    };
};

export const authService = {
    loginUserIntoDB,
};