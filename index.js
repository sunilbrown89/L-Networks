const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.router')
const contractRouter = require('./routes/contractor.router');
const connection = require("./db")

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());



app.use("/user", userRouter)
app.use("/contractor", contractRouter)


app.get('/',(req,res)=>{
  res.send(`<h1 style="color:brown;">Welcome to Laail Network</h1>`);
})
app.listen(8000, async() => {
  try{
      await connection;   
      console.log("connected to db")
  }
  catch(err){
      console.log(err,"something went wrong to db")
  }
  console.log("Server listening on port 8080")
})










