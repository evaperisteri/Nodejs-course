const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service')

function verifyToken(req, res, next) {
  const authHeader = req.header['authorization'];
  // console.log("REQ>>>>", req)
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({status: false, message:"access denied. no token provided"});
  }

  const result = authService.verifyAccessToken(token);

  if(result.verified) {
    req.user = result.data
    // console.log("REQ2>>>>>>", req)
    next()
  } else{
    return  res.status(403).json({status: false, data: result.data});
  }
}

function verifyRoles(allowedRole) {
  return (re, res, next) => {
    if(!req.user || !req.user.roles){
      return res.status(403).json({status: false, data: "forbidden access: no roles found"})
    }
    const userRoles = req.user.roles
    // const hasPermission = userRoles.some(role => allowedRole.includes(role));
    const hasPermission = userRoles.includes(allowedRole);
    if(!hasPermission){
      return res.status(403).json({status:false, data: "forbidden: insufficient permissions"})
    }
    next()
  }
}

module.exports = { verifyToken, verifyRoles }