const express = require("express");
const app = express();

// app.get("/api/users", (req, res)=>{})
// app.get("/api/users/user1", (req, res)=> {})
app.use(express.json())

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger')

const user = require('./routes/user.routes');
const userProduct = require('./routes/user.products.routes');
const auth = require('./routes/auth.routes');

app.use('/api/auth', auth);
app.use('/api/users', user);
app.use('/api/user-product', userProduct);

app.use('/api/dpocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument.options));

module.exports = app