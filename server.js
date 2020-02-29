const express = require('express');

const EssentialismRouter = require('./essentialism/essentialismRouter');
const AuthRouter = require('./essentialism-auth/authRouter')

const server = express();

server.use(express.json());
server.use('/api/essentialism', EssentialismRouter);
server.use('/api/essentialism/user', AuthRouter);

module.exports = server;