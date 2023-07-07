const IssueModel = require('../models/issue.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors/index');

const add = async (req, res) => {
    const issue = await IssueModel.create(req.body);
    res.status(StatusCodes.CREATED).json({ message: 'Added', issue })
};

const getAll = async(req, res) => {
    const issues = await IssueModel.find({})
    res.status(StatusCodes.OK).json({ nbHits: issues.length, issues })
};

const findById = async(req, res) => {
    const issueId = req.query.id;
    const issue = await IssueModel.findById(issueId);
    if (!issue) {
        throw new BadRequestError(`Issue not found!`);
    }
    res.status(StatusCodes.OK).json({ issue });
};

const findByProjectId = async(req, res) => {
    const {project} = req.query;
    const issues = await IssueModel.find({ project: project });
    res.status(StatusCodes.OK).json({ issues });
};

const remove = async(req, res) => {
    const issueId = req.query.id;
    const deletedissue = await IssueModel.findByIdAndRemove({ _id: issueId});

    if (!deletedissue) {
        throw new NotFoundError(`Issue with id ${issueId} not found!`);
    }

    res.status(StatusCodes.OK).json({ message: 'issue deleted'})
};

const edit = async(req, res) => {
    const issueId = req.query.id;
    // Join request before updating
    const request = await IssueModel.findByIdAndUpdate({ _id: issueId}, req.body);
    const updatedissue = await IssueModel.findById(request._id);

    if (!updatedissue) {
        throw new NotFoundError(`Join request not found!`);
    }

    res.status(StatusCodes.OK).json({ message: 'Updated', issue: updatedissue})
};

module.exports = { add, getAll, edit, findByProjectId, findById, remove }