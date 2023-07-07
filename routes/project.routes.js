const express = require('express');
const projectRouter = express.Router();

const { findById, findByName, add, remove, edit, getAll } = require('../controllers/project.controllers');

projectRouter.post('/add', add);
projectRouter.get('/list', getAll);
projectRouter.get('/findById', findById);
projectRouter.get('/findByName', findByName);
projectRouter.put('/update', edit);
projectRouter.delete('/delete', remove);

module.exports = projectRouter;