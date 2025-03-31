import express from 'express';
import {greet} from'./utils';

const app = express();
const port = 3000;

app.get('/', (req, res) =>{
  res.send("hello typescript")
})

app.get('/greetings', (req,res)=>{
  const message = greet("World 2");
  res.send(message);
})

app.listen(port, ()=>{
  console.log("server is up");
})