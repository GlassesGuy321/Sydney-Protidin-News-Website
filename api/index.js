const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 4000;

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;

app.use(cors({origin:`${process.env.FRONTEND_URL}`, credentials:true, }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(`${process.env.MONGOOSE_API_KEY}`);

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try {
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password, salt)
        });
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e);
    }
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        const userDoc = await User.findOne({username})
        if (bcrypt.compareSync(password, userDoc.password)) {
            jwt.sign({username,id:userDoc._id}, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true, // Enforces HTTPS (MUST be true in production)
                    sameSite: 'None' // Required for cross-origin cookies
                }).json({
                    id: userDoc._id,
                    username,
                });
            })
        }
    } catch (e) {
        res.status(400).json(e);
    }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    
    if (!token) {
        return res.json(null);
    }
    
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        res.json(info);
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

app.post('/post', async (req, res) => {
    const {title, tags, summary, imageLink, content} = req.body;
    const parsedTags = tags ? JSON.parse(req.body.tags || '[]') : [];

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        const postDoc = await Post.create({
            title,
            tags: parsedTags,
            summary,
            imageLink,
            content,
            author: info.id,
        })
        res.json(postDoc);
    })
    
})

app.put('/post', async (req, res) => {
    const {id, tags, title, summary, imageLink, content} = req.body;
    const parsedTags = tags ? JSON.parse(tags) : [];

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });

        const postDoc = await Post.findById(id);
        if (!postDoc) return res.status(404).json({ error: 'Post not found' });

        if (postDoc?.author?.toString() !== info.id) {
            return res.status(403).json({ error: 'You are not the author!' });
        }
        
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                title,
                tags: parsedTags,
                summary,
                imageLink,
                content,
            },
            { new: true }
        );

        res.json(updatedPost);
    })

})

app.get('/post', async (req, res) => {
    res.json(
        await Post.find()
            .populate('author', ['username'])
            .sort({createdAt: -1})
            .limit(20)
    );
})

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
})

app.listen(4000);