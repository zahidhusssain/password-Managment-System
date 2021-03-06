var express = require('express');
var router = express.Router();
var bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');
var passcateModel=require('../modules/password_category');
var passwordModel=require('../modules/add_password');
var userModel=require('../modules/user');
const { check, validationResult } = require('express-validator');
var getpasscat=passcateModel.find({});
var getAllpassword=passwordModel.find({});
/* GET home page. */
function checkuserlogin (req,res,next){
  var userToken=localStorage.getItem('usertoken');
  try {
    var decoded = jwt.verify(userToken, 'loginToken');
  } catch(err) {
    res.redirect('/');
  }
  next();
}

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

function checkEmil(req,res,next){
  var email=req.body.email;
  var existemail= userModel.findOne({email:email});
existemail.exec((err,data)=>{
  if(err) throw err;
  if(data){
    return res.render('signup', { title: 'Password Managment System' ,msg:'Email Already Exist..!'});
  }
  next();
});
}
function checkuname(req,res,next){
  var username=req.body.uname;
  var existusername= userModel.findOne({username:username});
  existusername.exec((err,data)=>{
  if(err) throw err;
  if(data){
    return res.render('signup', { title: 'Password Managment System' ,msg:'User Name Already Exist..!'});
  }
  next();
});
}
router.get('/',checkuserlogin, function(req, res, next) {
    var loginUser=localStorage.getItem('userLogin');
    getpasscat.exec(function(err,data){
      if(err) throw err;
      res.render('add-new-password', { title: 'Password Managment System',
      loginUser:loginUser,records:data,success:'',msg:'' });
      })
  });
  
function checkCategory(req,res,next){
    var category=req.body.password_category;
    var existcategory= passwordModel.findOne({password_category:category});
  existcategory.exec((err,data)=>{
    if(err) throw err;
    if(data){
      return res.render('add-new-password', { title: 'Password Managment System',loginUser:'',success:''
      ,records:'' ,msg:'Password Category Already Exist..!'});
    }
    next();
  });
  }
  router.post('/',checkCategory,checkuserlogin, function(req, res, next) {
    var loginUser=localStorage.getItem('userLogin');
    var passwordcategory=req.body.password_category;
    var project_name=req.body.project_name;
    var passworddetail=req.body.password_detail;
    var passwrdModel=new passwordModel({
      password_category:passwordcategory,
      Project_Name:project_name,
      password_Details:passworddetail
    });
  passwrdModel.save(function(err,doc){
      if(err) throw err;
      getpasscat.exec(function(err,data){
        if(err) throw err;
      res.render('add-new-password', { title: 'Password Managment System',loginUser:loginUser,
      records:data,success:'Password Details Inserted Successfully .!!',msg:'' });
      });
  });
  });
  module.exports = router;