const express = require('express');
const server = express();
const usersRouter = require('./users/usersRouter');
const issuesRouter = require('./issues/issuesRouter');

server.use(express.json());
server.use('/users', usersRouter);
server.use('/issues', issuesRouter);

module.exports = server;