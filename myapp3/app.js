const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs");

app.get('/create', (req, res)=>{
  console.log("create page");
  res.render('form', {});
})

app.post('/user', (req, res)=>{
  console.log("user post")
  let data = req.body;
  console.log("Data:", data)
  let username = data.username;
  let email = data.email;

  res.render('user', {
    data1: username,
    data2: email
  })
})

app.get('/users', (req, res)=>{
  console.log("users page")
  const users = [
    {
      "username":"markos",
      "email": "mark@aueb.gr"
    },
    {
      "username":"thanasis",
      "email": "than@aueb.gr"
    }
  ]
  res.render("users", {users})
})

app.listen(port, ()=> {
  console.log("server is up");
})