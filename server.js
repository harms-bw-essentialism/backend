const express = require('express');

const ValuesRouter = require('./essentialism/valuesRouter');
const AuthRouter = require('./essentialism-auth/authRouter')

const server = express();

server.use(express.json());
server.use('/api/essentialism/values', ValuesRouter);
server.use('/api/essentialism/user', AuthRouter);

module.exports = server;