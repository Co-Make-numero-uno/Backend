const express = require('express');
const cors = require('cors')
const server = express();
const usersRouter = require('./users/users-router');
const issuesRouter = require('./issues/issues-router');

server.use(cors());
server.use(express.json());
server.use('/users', usersRouter);
server.use('/issues', issuesRouter);

module.exports = server;