// // // // import express, { type Application, type Request, type Response } from "express"
// // // // const app : Application = express()
// // // // const port = 5000

// // // // app.use(express.json())

// // // // app.get('/', (req : Request, res : Response) => {
// // // // //   res.send('Alhamdulliah express server : Hello World!')
// // // //   res.status(200).json({
// // // //     "message" : "Express Server",
// // // //     "author" : "Next Level",
// // // //   });
// // // // });

// // // // app.post('/',async(req : Request, res : Response)=>{

// // // //     console.log(req.body);
    
// // // // })

// // // // app.listen(port, () => {
// // // //   console.log(`Example app listening on port ${port}`)
// // // // })


// // // import express, { type Application, type Request, type Response } from "express"
// // // import {Pool} from "pg"

// // // const app : Application = express()
// // // const port = 5000

// // // // JSON data read করার middleware
// // // app.use(express.json())
// // // app.use(express.text());
// // // app.use(express.urlencoded({extended : true}));

// // // const pool = new Pool({
// // //     connectionString : "postgresql://neondb_owner:npg_3wres5KXJxpz@ep-crimson-lake-aqijv56e-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
// // // });

// // // const initDB = async()=>{
// // //     try {

// // //         await pool.query(`
// // //             CREATE TABLE IF NOT EXISTS users(
// // //             id SERIAL PRIMARY KEY,
// // //             name VARCHAR(20),
// // //             email VARCHAR(20) NOT NULL,
// // //             password VARCHAR(20) NOT NULL,
// // //             is_active BOOLEAN DEFAULT true,
// // //             age INT,

// // //             created_at TIMESTAMP DEFAULT NOW(),
// // //             updated_at TIMESTAMP DEFAULT NOW()
// // //             )
// // //             `)
// // //             console.log("Alhamdulliah Database connected successfully!");
// // //     } catch (error) {
// // //         console.log(error);
// // //     }
// // // };
// // // initDB();

// // // // GET API
// // // app.get('/', (req : Request, res : Response) => {

// // //   // এটা ঠিক ছিল 👍
// // //   // res.send('Alhamdulliah express server : Hello World!')

// // //   res.status(200).json({
// // //     "message" : "Express Server",
// // //     "author" : "Next Level",
// // //   });
// // // });


// // // // POST API
// // // app.post('/', async(req : Request, res : Response)=>{

// // //     // console.log(req.body);
// // //     const {name,email,password, age} = req.body;
// // //     res.status(201).json({
// // //      message : "created",
// // //      data : {
// // //         name,
// // //         email,
// // //         password,
// // //         age
// // //      },
// // //     });


// // //     // res.status(200).json({
// // //     //   success : true,
// // //     //   message : "Data received successfully",
// // //     //   data : req.body
// // //     // });

// // // });


// // // // Server run
// // // app.listen(port, () => {

// // //   // এটা ঠিক ছিল 👍
// // //   console.log(`Example app listening on port ${port}`)

// // // })



// // import express, { type Application, type Request, type Response } from "express"
// // import {Pool} from "pg"

// // const app : Application = express()
// // const port = 5000

// // // JSON data read করার middleware
// // app.use(express.json())
// // app.use(express.text());
// // app.use(express.urlencoded({extended : true}));

// // const pool = new Pool({

// //     // ❌ আগে ছিল:
// //     // sslmode=require

// //     // ✅ FIX:
// //     // future warning avoid করার জন্য verify-full use করা হয়েছে

// //     connectionString : "postgresql://neondb_owner:npg_3wres5KXJxpz@ep-crimson-lake-aqijv56e-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=verify-full&channel_binding=require",
// // });

// // const initDB = async()=>{

// //     try {

// //         await pool.query(`
// //             CREATE TABLE IF NOT EXISTS users(
// //             id SERIAL PRIMARY KEY,
// //             name VARCHAR(20),
// //             email VARCHAR(20) NOT NULL,
// //             password VARCHAR(20) NOT NULL,
// //             is_active BOOLEAN DEFAULT true,
// //             age INT,

// //             created_at TIMESTAMP DEFAULT NOW(),
// //             updated_at TIMESTAMP DEFAULT NOW()
// //             )
// //             `)

// //             // এটা ঠিক ছিল 👍
// //             console.log("Alhamdulliah Database connected successfully!");

// //     } catch (error) {

// //         // এটা ঠিক ছিল 👍
// //         console.log(error);
// //     }
// // };

// // initDB();


// // // GET API
// // app.get('/', (req : Request, res : Response) => {

// //   // এটা ঠিক ছিল 👍
// //   // res.send('Alhamdulliah express server : Hello World!')

// //   res.status(200).json({
// //     "message" : "Express Server",
// //     "author" : "Next Level",
// //   });
// // });


// // // POST API
// // app.post('/', async(req : Request, res : Response)=>{

// //     // ❌ আগে শুধু data destructure করছিলে
// //     // database এ save করছিলে না

// //     const {name,email,password, age} = req.body;


// //     // ✅ FIX:
// //     // database এ insert query add করা হয়েছে

// //     const query = `
// //         INSERT INTO users(name,email,password)
// //         VALUES($1,$2,$3,$4)
// //         RETURNING *
// //     `;

// //     const values = [name,email,password];

// //     const result = await pool.query(query,values);


// //     // ❌ আগে manually data return করছিলে

// //     // ✅ FIX:
// //     // database থেকে insert হওয়া real data return করা হয়েছে

// //     res.status(201).json({
// //      message : "created",
// //      data : result.rows[0],
// //     });


// //     // এটা old code ছিল 👍
// //     // res.status(200).json({
// //     //   success : true,
// //     //   message : "Data received successfully",
// //     //   data : req.body
// //     // });

// // });


// // // Server run
// // app.listen(port, () => {

// //   // এটা ঠিক ছিল 👍
// //   console.log(`Example app listening on port ${port}`)

// // })

// import express, { type Application, type Request, type Response } from "express"
// import {Pool} from "pg"

// const app : Application = express()
// const port = 5000

// // JSON data read করার middleware
// app.use(express.json())
// app.use(express.text());
// app.use(express.urlencoded({extended : true}));

// const pool = new Pool({

//     // ❌ আগে ছিল:
//     // sslmode=require

//     // ✅ FIX:
//     // future warning avoid করার জন্য verify-full use করা হয়েছে

//     connectionString : "postgresql://neondb_owner:npg_3wres5KXJxpz@ep-crimson-lake-aqijv56e-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=verify-full&channel_binding=require",
// });

// const initDB = async()=>{

//     try {

//         await pool.query(`
//             CREATE TABLE IF NOT EXISTS users(
//             id SERIAL PRIMARY KEY,
//             name VARCHAR(20),
//             email VARCHAR(20) NOT NULL,
//             password VARCHAR(20) NOT NULL,
//             is_active BOOLEAN DEFAULT true,
//             age INT,

//             created_at TIMESTAMP DEFAULT NOW(),
//             updated_at TIMESTAMP DEFAULT NOW()
//             )
//             `)

//             // এটা ঠিক ছিল 👍
//             console.log("Alhamdulliah Database connected successfully!");

//     } catch (error) {

//         // এটা ঠিক ছিল 👍
//         console.log(error);
//     }
// };

// initDB();


// // GET API
// app.get('/', (req : Request, res : Response) => {

//   // এটা ঠিক ছিল 👍
//   // res.send('Alhamdulliah express server : Hello World!')

//   res.status(200).json({
//     "message" : "Express Server",
//     "author" : "Next Level",
//   });
// });


// // POST API
// app.post('/', async(req : Request, res : Response)=>{

//     // request body থেকে data নেওয়া
//     const {name,email,password,age} = req.body;


//     // ✅ FIX:
//     // age column add করা হয়েছে

//     const query = `
//         INSERT INTO users(name,email,password,age)
//         VALUES($1,$2,$3,$4)
//         RETURNING *
//     `;


//     // ✅ FIX:
//     // এখানে 4টা values দেওয়া হয়েছে

//     const values = [name,email,password,age];

//     const result = await pool.query(query,values);


//     // response
//     res.status(201).json({
//      message : "created",
//      data : result.rows[0],
//     });

// });


// // Server run
// app.listen(port, () => {

//   // এটা ঠিক ছিল 👍
//   console.log(`Example app listening on port ${port}`)

// })


import express, { response, type Application, type Request, type Response } from "express"
import {Pool} from "pg"
import config from "./config"

const app : Application = express()
const port = config.port;

// JSON data read করার middleware
app.use(express.json())
app.use(express.text());
app.use(express.urlencoded({extended : true}));

const pool = new Pool({

    // ✅ শুধু এইটুকু change করা হয়েছে
    // sslmode=require -> sslmode=verify-full

    connectionString : config.connection_string,
});



const initDB = async()=>{
    try {

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            email VARCHAR(20) UNIQUE NOT NULL,
            password VARCHAR(20) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            age INT,

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `)

            console.log("Alhamdulliah Database connected successfully!");

    } catch (error) {

        console.log(error);
    }
};

initDB();

// GET API
app.get('/', (req : Request, res : Response) => {

  // এটা ঠিক ছিল 👍
  // res.send('Alhamdulliah express server : Hello World!')

  res.status(200).json({
    "message" : "Express Server",
    "author" : "Next Level",
  });
});


// POST API
app.post('/api/users', async(req : Request, res : Response)=>{

    // console.log(req.body);

    const {name,email,password, age} = req.body;


   try {
     const result = await pool.query(`
        INSERT INTO users(name,email,password,age) VALUES ($1,$2,$3,$4)
        RETURNING *
        
        `,[name,email,password,age]);
        // console.log(result);
        


    res.status(201).json({
     message : "Alhamdulliah USer created",
     data : result.rows[0],
    });

   } catch (error : any) {
     res.status(500).json({
          success : false,
     message : error.message,
     error : error,
    });
   }
    // res.status(200).json({
    //   success : true,
    //   message : "Data received successfully",
    //   data : req.body
    // });

});



app.get('/api/users',async(req : Request, res : Response)=>{
try {
    const result = await pool.query(`
        SELECT * FROM users
        `)
        res.status(200).json({
            success : true,
            message : "Users retrieved successfully!",
            data: result.rows,
        })
} catch (error : any) {
     res.status(500).json({
            success : false,
            message : error.message,
           error: error,
        })
}
})

app.get('/api/users/:id',async(req : Request, res : Response)=>{
 const {id} = req.params;

try {
    const result = await pool.query(`
        SELECT * FROM users WHERE id =$1
        `,[id],
        );

        if(result.rows.length === 0){
 res.status(404).json({
            success : false,
            message :"Users Not Found",
           data: {},
        })
        }



         res.status(200).json({
            success : true,
            message : "Users retrieved successfully!",
            data: result.rows[0],
        })
    
        
} catch (error : any) {
     res.status(500).json({
            success : false,
            message : error.message,
           error: error,
        })
}
})


app.put('/api/users/:id', async(req : Request, res : Response)=>{

    const {id} = req.params;
    const {name,password,age, is_active} = req.body;
    
    
    // console.log("Id :", id);
    // console.log({name,password,age, is_active});

 try {
       const result = await pool.query(`
        UPDATE
        users SET name=COALESCE($1, name),
        password=COALESCE($2, password),
        age=COALESCE($3, age),
        is_active=COALESCE($4, is_active)
        WHERE id=$5
        RETURNING *


        `,[name,password,age,is_active,id]);


        if(result.rows.length === 0){
 res.status(404).json({
            success : false,
            message :"Users Not Found",
        })
        }
        // console.log(result);

         res.status(200).json({
            success : true,
            message : "ALhamdulliah Users updated successfully!",
            data: result.rows[0],
        });
 } catch (error : any) {
       res.status(500).json({
            success : false,
            message : error.message,
           error: error,
        })
 }
        
})


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


// Server run
app.listen(port, () => {

  // এটা ঠিক ছিল 👍
  console.log(`Example app listening on port ${port}`)

})