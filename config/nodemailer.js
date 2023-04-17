const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');


let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:'587',
    auth:{
        user:'alchemy.cn18',
        pass:'codingninjas',

    }
});
let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(_dirname,'../views/mailers',realativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering template');return
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}
module.exports ={
    transporter:transporter,
    renderTemplate:renderTemplate,
}