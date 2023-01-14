
const express = require('express'); 

const app = express();
const port = 8000;

// use express routers
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        consol.log(`Error in running the server:${err}`);

    }
    
    console.log(`Server is running on port:${port}`);
});

