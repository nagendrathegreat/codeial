const Post = require('../../../models/post');


module.exports.index= async function(req,  res){
    
    // let posts = await Post.find({})
    //     .sort('-createdAt')
    //     .populate('user')
    //     .populate({
    //         path:'comments',
    //             populate: {
    //                 path: 'user'
    //             }
            
    //     });
    let posts = await Post.find({})
        
        .sort('-createdAt')
        .populate('user',)
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
    return res.json(200,{
        message:"List Of Post",
        posts: posts
    });
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        //.id means converting the object id to string  
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id }
            );
           
        //    req.flash('success','Post and associated coments deleted!');
            return res.json(200,{
                message:"Post and associated comments deleted successfully!"
            });
            
            // return res.redirect('back');
        } else {
            return res.json(401,{
                message:"You Cannot delete this post"
            })
        }
    } catch (err) {
        // req.flash('error',err);
        // return res.redirect('back');
        console.log('*********',err);
        return res.json(500,{
            message: "Internal server Error"
        });
    }



}