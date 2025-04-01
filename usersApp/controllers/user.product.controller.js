const User = require('../models/user.model');

exports.findAll= async(req, res) => {
  console.log("find all users the products");
  try{
    const result = await User.find({}, {username:1, products:1, _id:0});
    res.status(200).json({status: true, data: result});
  } catch (err){
    console.log("problem in finding the products from all users");
    res.status(400).json({status:false, data:err})
  }
}

exports.findOne = async(req, res) => {
  console.log("Find products for specific user");
  const username = req.params.username;
  try {
    const result = await User.findOne({username:username}, {username:1, products:1, _id:0});
    res.status(200).json({status:true, data:result});
  } catch(err){
    console.log("problem in finding user's products", err);
    res.status(400).json({status:false, data:err})
  }
}

exports.create = async(req, res) => {
  console.log("insert products to user");
  const username = req.body.username;
  const products = req.body.products;
  try{
    const result = await User.updateOne(
      {username: username},
      {
        $push: {
          products: products
        }
      }
    );
    res.status(200).json({status:true, data:result})
  } catch(err){
    console.log("Problem in inserting products", err);
    res.status(400).json({status:false, data:err})
  }
}

exports.update = async(req, res)=>{
  const username = req.body.username;
  const product_id = req.body.product_id;
  const product_quantity = req.body.product.quantity;
  console.log("update product for username: ", username);
  try{
    const result = await User.updateOne(
      {username:username, "products._id": product_id},
      {$set: {
        "products.$.quantity":product_quantity
      }}
    );
    res.status(200).json({status:true, data:result})
  } catch (err) {
    console.log("problem in updating product", err)
    res.status(400).json({status:false, data:err})
  }
}

exports.delete = async (req, res) =>{
  const username = req.params.username;
  const product_id = req.params.id;
  console.log("Delete product from user: ", username);
  try{
    const result = await User.updateOne(
      {username:username},
      {
        $pull:{
          products:{_id:product_id}
        }
      }
    );
    res.status(200).json({status:true, data:result})
  } catch (err) {
    console.log("problem in deleting product", err);
    res.status(400).json({status:false, data:err});
  }
}

exports.stats1 = async(req, res)=>{
  console.log("for each user return total amount and num of products");
  try{
    const result = await User.aggregate([
      {
        $unwind: "$products"
      },
      {
        $project: {
          _id:1,
          username:1,
          products:1
        }
      },
      {
        $group: {
          _id: {username: "$username", products: "$products.product"},
          totalAmount: {
            $sum: {$multiply:["$products.cost", "$products.quantity"]}
          },
          count: {$sum:1}
        }
      },
      {
        $sort:{"_id.username":1, "_id.product":1}
      }
    ]);
    res.status(200).json({status:true, data:result})
  } catch (err) {
    console.log("problem in stats1 " , err)
    res.status(400).json({status:false, data:err})
  }
}