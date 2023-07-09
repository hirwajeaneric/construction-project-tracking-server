const express = require('express');
const router = express.Router();

const user = require('./user.routes');
const project = require('./project.routes');
const material = require('./material.routes');
const email = require('./email.routes');
const issue = require('./issue.routes');
const sprint = require('./sprint.routes');

router.use('/files', express.static('./files'));
router.use('/materials', express.static('./materials'));

router.use('/email', email);
router.use('/user', user);
router.use('/project', project);
router.use('/material', material);
router.use('/issue', issue);
router.use('/sprint', sprint);

module.exports = router; 