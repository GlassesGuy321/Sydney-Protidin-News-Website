const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
    const {username, password} = req.body;
    res.json({requestData:{username,password}});
})

app.listen(4000);
// mongodb+srv://blog:ZIaHR7FP9stooSho@cluster0.uqfaw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// ZIaHR7FP9stooSho