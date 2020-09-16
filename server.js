const express = require('express');
const server = express();
const usersRouter = require('./routers/usersRouter');
const issuesRouter = require('./routers/issuesRouter');

server.use(express.json());
server.use('/users', usersRouter);
server.use('/issues', issuesRouter);

module.exports = server;