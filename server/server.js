import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg';
import bcrypt from 'bcrypt'
import env from 'dotenv'
import cookieParser from 'cookie-parser';
import session from 'express-session';


const app = express();
env.config();
app.use(cors({
  origin:process.env.ORIGIN,
  methods:["POST","GET"],
  credentials:true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:false,
  cookie:{
    secure:false,
    maxAge:1000*60*60
  }
}));
const port = 5000;
const saltRounds = 5;



const db = new pg.Client({
    connectionString: process.env.connectionString,
});

db.connect();

app.get('/', async(req, res)=>{
})


app.get('/post',async (req,res)=>{
  const post_data = await db.query('SELECT * FROM posts ORDER BY post_id DESC');
  res.send(post_data.rows);
  
})

app.post('/getContent',async(req,res)=>{
  let id = req.body.id;
  const result = await db.query('SELECT * from posts WHERE post_id = ($1)',[id])
  res.send({post:result.rows[0]});
})

app.post('/edit',async(req,res)=>{
  const title = req.body.title;
  const content = req.body.content;
  const id = req.body.id;
  const result = await db.query("UPDATE posts SET post_title = ($1), post_content = ($2) WHERE post_id = ($3)",[title,content,id])
  
})


app.post('/create', async(req,res)=>{
  const title = req.body.title;
  const content = req.body.content;
  if(title !=  null && content != null){
    const result = await db.query( "INSERT INTO posts (post_title, post_content) VALUES ($1, $2) RETURNING *", [title, content])
  }
});

app.post('/login', async(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  try{
  const check_user = await db.query("SELECT * FROM user_details  WHERE username=$1",[username]);
  if(check_user.rows.length>0){
    const user = check_user.rows[0]
    req.session.username =  user.username;
    await bcrypt.compare(password,user.password, (err,valid)=>{
      if(err){
        console.log("Error compairing passwords:",err);
      }else{
        if(valid){
          res.send({user : req.session.username})
        }else{
          res.send({status:"unsuccessful"})
        }
      }
    })
  }else{
    res.send({status:"User doesn't exists. Please Register."});
  }
}catch(err){
  console.log(err)
}})


app.post('/register', async(req, res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const check_user = await db.query("SELECT * FROM user_details WHERE  username=$1", [username]);
    if(check_user.rows.length>0){
      res.send({status:'exist',data:"User alredy registered. Redirecting to Login Page."})
    }else{
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO user_details (username,email, password) VALUES ($1, $2, $3) RETURNING *",
            [username,email, hash]
          );
          res.send({status:'success'})
        }
      });
    }
    })
  
    

app.post('/del',async(req,res)=>{
  await db.query('DELETE FROM posts WHERE post_id = ($1)',[req.body.id]);
  res.send({status:"success"});
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})