const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
exports.options = {
  "components":{
    "schemas": {
      User: m2s(User)
    }
  }, 
  "openpai": "3.1.0",
  "info": {
    "version": "1.0.0",
    "title": "Users and products CRUD API",
    "description": "An applivation for creating users and choosing products",
    "contact": {
      "name": "API support",
      "url": "https://aueb.gr",
      "email": "support@exampl.com"
    }
  }
  
}