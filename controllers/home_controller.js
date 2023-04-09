const Post = require('../models/post');
const User = require('../models/users');
module.exports.home = async function (req, res) {
    //return res.end('<h1>Express is up for codeial!</h1> ');
    //console.log(req.cookies);
    // Post.find({},function(err,posts){
    //     return res.render('home',{

    //         title:"Codeial | Home",
    //         posts:posts
    //     });

    // });
    try{
        let posts = await Post.find({})
        
        .sort('-createdAt')
        .populate('user',)
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })


    let users = await User.find({});


    return res.render('home', {

        title: "Codeial | Home",
        posts: posts,
        all_users: users
    });

    }catch(err){
        console.log('Error',err);
        return;
    }
    

}


//module.exports.actioName=function(req,res){}