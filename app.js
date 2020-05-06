const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get('/api', (req, res) => {
    res.json({message: 'welcome to the api'});
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, data)=>{
        if(err){
            res.status(403).json({message: 'forbidden'});
        } else{
            res.json({
                message: 'post created', data
            })
        }
    });
});

app.post('/api/login', (req, res) =>{
    // Mock User
    const user = {
        id: 1,
        username: 'thedarkkid',
        email: 'thedarkkid.codes@gmail.com'
    };

    jwt.sign({user}, 'secret', {expiresIn: '30d'}, (err, token)=>{
        res.json({token});
    });
});

// verify token
function verifyToken(req, res, next){
    // get auth header value
    const bearerHeader = req.headers['authorization'];

    // check if bearer is undefined
    if(typeof  bearerHeader !== 'undefined'){
        // split at the bearer
        const bearer = bearerHeader.split(' ');

        // get token from array
        // set the token
        req.token = bearer[1];
    }else{
        // forbidden
        res.status(403).json({message: "Forbidden"})
    }

    next();
}
let port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Server started on port ${port}`));

