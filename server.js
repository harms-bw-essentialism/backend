const express = require('express');
const cors = require('cors')

const ValuesRouter = require('./essentialism/valuesRouter');
const ProjectsRouter = require('./essentialism/projectsRouter');
const AuthRouter = require('./essentialism-auth/authRouter');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/essentialism/values', ValuesRouter);
server.use('/api/essentialism/projects', ProjectsRouter);
server.use('/api/essentialism/user', AuthRouter);

module.exports = server;