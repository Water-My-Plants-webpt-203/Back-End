const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require('./auth/auth-router.js');
const userRouter = require('./users/user-router.js');
const plantRouter = require('./plants/plant-router.js');
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);
server.use('/api/plants', plantRouter);

server.get('/', (req, res) => {
    res.json({ api :  "Welcome to the Water My Plants API...."})
})


module.exports = server;
