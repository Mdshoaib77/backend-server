
import express, { response, type Application, type Request, type Response } from "express"
import { pool } from "./db";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profiles/profile.route";
import { authRoute } from "./modules/auth/auth.route";

const app : Application = express()

// JSON data read করার middleware
app.use(express.json())
app.use(express.text());
app.use(express.urlencoded({extended : true}));



app.get('/', (req : Request, res : Response) => {

  res.status(200).json({
    "message" : "Express Server",
    "author" : "Next Level",
  });
});

app.use("/api/profile", profileRoute);

app.use("/api/auth", authRoute);




app.use('/api/users',userRoute)


// API
app.delete("/api/users/:id",async(req : Request, res : Response)=>{
    const {id} = req.params;
    try {
        const result = await pool.query(`
            DELETE FROM users WHERE id=$1
            `,
        [id],);


        console.log(result);
        if(result.rowCount === 0){
 res.status(404).json({
            success : false,
            message :"Users Not Found",
        })
        }
        
          res.status(200).json({
            success : true,
            message : "Users Deleted successfully!",
            data: {},
        })
        
    } catch (error : any) {
        res.status(500).json({
            success : false,
            message : error.message,
           error: error,
        })
    }
})


export default app

