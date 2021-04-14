const express = require("express");
const app = express();

app.use(express.json());
//app.use(express.urlencoded({extended: false}));

app.use('/', require('./route/postsRoute'));
app.use(function(error, req, res, next){

    if(error.message === 'Post a already exists'){
        res.status(409).send(error.message);
        return;
    } 
    if(error.message === 'Post not found'){
        res.status(404).send(error.message);
        return;
    }
    
    res.status(500).send(error.message);
  
});

app.listen(3000, () => {
    console.log("Server running in port 3000");
});