const User =require('../models/users');
const fs=require('fs');
const path=require('path');

module.exports.profile=function(req,res){
   User.findById(req.params.id,function(err,user){
      return res.render('user_profile',{
         title:'User Profile',
         profile_user:user
      });
   });
   // res.end('<h1>User Profile</h1>');
}

module.exports.update= async function(req,res){
   // if(req.user.id==req.params.id){
   //    User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
   //       return res.redirect('back');
   //    })
   // }else{
      //req.flash('error','Unauthorized!');
   //    return res.status(401).send('Unauthorized');
   // }
   if(req.user.id==req.params.id){
      try{
         let user=await User.findById(req.params.id);
         User.uploadedAvatar(req,res,function(err){
            if(err){
               console.log('*******Multer Error: ',err);
            }
          user.name=req.body.name;
          user.email=req.body.email;
          if(req.file){

            if(user.avatar){
               fs.unlinkSync(path.join(__dirname,'..',user.avatar));
            }
            //this is saving the path of the uploaded file into the avatar field in the user
            user.avatar = User.avatarPath +'/'+ req.file.filename;
          }
          user.save();
          return res.redirect('back');
         });
      }catch(err){
         req.flash('error',err);
         return res.redirect('back');
      }
   }else{
      req.flash('error','Unauthorized!');
      return res.status(401).send('Unauthorized');
   }
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
   req.flash('success','Logged in Succesfully');
   return res.redirect('/');
}

// Sign out the
module.exports.destroySession = function(req,res,next){
   req.logout(function(err) {
      if (err) { return next(err); };
   req.flash('success','You have logged out !');
   return res.redirect('/');
});
}
