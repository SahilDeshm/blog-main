const express = require('express')
const app  =  express();
const cors = require('cors');
const mongoose = require("mongoose");
const User =require('./models/User');
const Post =require('./models/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/'});  
const fs = require('fs');
require('dotenv').config();

const salt = bcrypt.genSaltSync(10);
const secret = 'dwfbwerfbwrlf24f444fimvnomvcm';

app.use(cors({credentials:true, origin:`http://localhost:${process.env.PORT | process.env.LOCAL_PORT}`}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads',express.static(__dirname + '/uploads'));

//mongoose.connect('mongodb+srv://blog:WtaREZXTW9L0ScRW@cluster0.dunulw2.mongodb.net/?retryWrites=true&w=majority');
function init() {
    
    mongoose.connect('mongodb+srv://blog:WtaREZXTW9L0ScRW@cluster0.dunulw2.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`DB connected`);
    }).catch((err) => 
    console.log(`DB connection failed ${err}`));
}

app.post('/register' , async (req,res) => {
    console.log(req.body);
    const {username , password} = req.body;
    
    try{
        const userDoc = await User.create({
            username , 
            password: bcrypt.hashSync(password,salt),})
    res.json({userDoc});
    }
    catch(e) {
        res.status(400).json(e);
    }
    
});
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username,password);
    const userDoc = await User.findOne({ username });

    // Check if userDoc is null or undefined
    if (!userDoc) {
        return res.status(400).json("User not found");
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
        jwt.sign({ username, id: userDoc._id }, secret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json('ok');
        });
        
    } else {
        res.status(400).json("Wrong credentials");
    }
});

app.get('/profile' , (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, (err, info) => {
        if (err) {
            // Handle error, e.g., unauthorized access
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.json(info);
    });   
});

app.post('/logout' , (req,res) => {
    res.cookie('token', token).json('ok');

});

app.post('/post' , uploadMiddleware.single('file'), async (req,res) => {
    console.log(req.file);  // Log the file information

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const {originalname ,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path+ '.' +ext;
    fs.renameSync(path , newPath);

    const {title,summary,content}= req.body;
    const postDoc =await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        
          
        });
        res.json({postDoc});
    });
    app.get('/post', async (req,res) => {
        res.json(
          await Post.find()
            .sort({createdAt: -1})
            .limit(20)
        );
      });

      app.get('/post/:id', async (req,res) => {
        const {id} = req.params;   
        const postDoc = await Post.findById(id);
        res.json(postDoc);
        console.log(postDoc);
      })
      


app.listen(4000, () => {
    console.clear()
    init()
    console.log(`Server @ http://localhost:4000`);
});

