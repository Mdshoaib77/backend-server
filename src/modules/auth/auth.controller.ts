// // import type { Request, Response } from "express"
// // import { authService } from "./auth.service"


// // const loginUser = async(req : Request,res : Response)=>{

// //     try {
// // const result = await authService.loginUserIntoDB(req.body)


// // const {refreshToken} = result;

// // res.cookie("refreshToken",refreshToken,
// //     {secure : false, //In production = true;
// //      httpOnly : true,
// //      sameSite : 'lax'
// //     })



         
// //           res.status(200).json({
// //             success : true,
// //             message : "Users Deleted successfully!",
// //             data: result,
// //         })


// //     } catch (error : any) {
// //           res.status(500).json({
// //             success : false,
// //             message : error.message,
// //            error: error,
// //         })
// //     }

// // }

// // export const authController = {
// //     loginUser
// // }


// import type { Request, Response } from "express";
// import { authService } from "./auth.service";

// const loginUser = async(req : Request,res : Response)=>{

//     try {

//         const result = await authService.loginUserIntoDB(req.body);

//         const { refreshToken, ...rest } = result;

//         res.cookie("refreshToken", refreshToken, {
//             secure : false, // In production = true
//             httpOnly : true,
//             sameSite : "lax"
//         });

//         res.status(200).json({
//             success : true,
//             message : "User logged in successfully!",
//             data : rest,
//         });

//     } catch (error : any) {

//         res.status(500).json({
//             success : false,
//             message : error.message,
//             error : error,
//         });

//     }

// }

// export const authController = {
//     loginUser
// };

// import type { Request, Response } from "express";
// import { authService } from "./auth.service";

// const loginUser = async(req : Request,res : Response)=>{

//     try {

//         const result = await authService.loginUserIntoDB(req.body);

//         const { refreshToken, ...rest } = result;

//         console.log("Refresh Token:", refreshToken);

//         res.cookie("refreshToken", refreshToken, {
//             secure : false, // In production = true
//             httpOnly : true,
//             sameSite : "lax"
//         });

//         res.status(200).json({
//             success : true,
//             message : "User logged in successfully!",
//             data : rest,
//         });

//     } catch (error : any) {

//         res.status(500).json({
//             success : false,
//             message : error.message,
//             error : error,
//         });

//     }

// }

// export const authController = {
//     loginUser
// };

import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async(req : Request,res : Response)=>{

    try {

        const result = await authService.loginUserIntoDB(req.body);

        const { accessToken, refreshToken } = result;

        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);

        res.cookie("refreshToken", refreshToken, {
            secure : false, // In production = true
            httpOnly : true,
            sameSite : "lax",
        });

        res.status(200).json({
            success : true,
            message : "User logged in successfully!",
            data : {
                accessToken,
                refreshToken,
            },
        });

    } catch (error : any) {

        res.status(500).json({
            success : false,
            message : error.message,
            error : error,
        });

    }

};

const refreshToken = async(req : Request,res : Response)=>{
console.log(req.cookies);

}


export const authController = {
    loginUser,
    refreshToken
};