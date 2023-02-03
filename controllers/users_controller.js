const User =require('../models/users');

module.exports.profile=function(req,res){
   // res.end('<h1>User Profile</h1>');
   return res.render('user_profile',{
      title:'User Profile'
   })
  
}
//render the sign up page
module.exports.signUp = function(req,res){
   return res.render('user_sign_up',{
      title:"Codeial | Sign Up"
   });
}

//render the sign in page
module.exports.signIn = function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
   return res.render('user_sign_in',{
      title:"Codeial | Sign In"
   });
}


//GET THE SIGNUP DATA
module.exports.create =function(req,res){
   if(req.body.password !=req.body.confirm_password){
      return res.redirect('back');
   }
   User.findOne({email:req.body.email},function(err,user){
      if(err){console.log('error in finding user in signing up');return;}
  
      if(!user){
         User.create(req.body,function(err,user){
            if(err){console.log('error in creating user in signing up');return;}
            
            return res.redirect('/users/sign-in');

         })
      }else{
         return res.redirect('back');
      }
  
   });
}

//Sign In and create session for the user manual authentication
// module.exports.createSession=function(req,res){
//    //steps to authenticate
   
//    //find the user 
//    User.findOne({email:req.body.email},function(err,user){
//       if(err){console.log('error in finding user in signing in');return;}
//       //handle user found
//       if(user){
//          //handle password which don't match
//          if(user.password !=req.body.password){
//             return res.redirect('back');
//          }
//          //handle session creation
//          res.cookie('user_id',user.id);
//          return res.redirect('/users/profile');
//        }else{
//       //     //handle user not found


//           return res.redirect('back');
          
//       }
//    });
  
// }


//Sign In and create session for the user by  passport js  authentication

module.exports.createSession = function(req,res){
   return res.redirect('/');
}

// Sign out the
module.exports.destroySession = function(req,res,next){
   req.logout(function(err) {
      if (err) { return next(err); };

   return res.redirect('/');
});
}
