require('colors');
require('dotenv').config();
const cors = require('cors');
require('./src/configs/pathAlias');
const express = require('express');
const services = require('@/services');
const middlewares = require('@/middlewares');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
const port = process.env.PORT || 5000;

app.use('/api/auth', services.auth);
app.use('/api/users', services.users);
app.use('/api/contents', services.contents);

app.get('/api', middlewares.rootResponse(port));
app.listen(port, middlewares.runApp(port));
