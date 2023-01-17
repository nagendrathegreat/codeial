
const express = require('express'); 

const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');


//access static files
app.use(express.static('./assets'));
app.use(expressLayouts);
//extract style and scripts from sub pages in to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express routers
app.use('/',require('./routes'));


//set up the view engine
app.set('view engine','ejs');

app.set('views','./views');

app.listen(port,function(err){
    if(err){
        consol.log(`Error in running the server:${err}`);

    }
    
    console.log(`Server is running on port:${port}`);
});

