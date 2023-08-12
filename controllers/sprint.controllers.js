const SprintModel = require('../models/sprint.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors/index');
const asyncWrapper = require('../middleware/async');
const materialModel = require('../models/material.model');

const add = asyncWrapper(async (req, res) => {
    const existingSprints = await SprintModel.find({});
    var numberOfNextSprint = existingSprints.length + 1;
    req.body.number = numberOfNextSprint;

    const sprint = await SprintModel.create(req.body);
    res.status(StatusCodes.CREATED).json({ message: 'Added', sprint })
});

const getAll = async(req, res) => {
    const sprints = await SprintModel.find({});
    res.status(StatusCodes.OK).json({ nbHits: sprints.length, sprints })
};

const findById = async(req, res) => {
    const sprintId = req.query.id;
    const sprint = await SprintModel.findById(sprintId);
    if (!sprint) {
        throw new BadRequestError(`Sprint not found!`);
    }
    res.status(StatusCodes.OK).json({ sprint });
};

const findByProjectId = async(req, res) => {
    const {project} = req.query;
    const sprints = await SprintModel.find({ project: project });
    res.status(StatusCodes.OK).json({ sprints });
};

const findByIssueId = async(req, res) => {
    const issueId = req.query.issue;
    const sprints = await SprintModel.find({ issue: issueId });
    res.status(StatusCodes.OK).json({ sprints });
};

const remove = async(req, res) => {
    const sprintId = req.query.id;
    const deletedsprint = await SprintModel.findByIdAndRemove({ _id: sprintId});

    if (!deletedsprint) {
        throw new NotFoundError(`Sprint with id ${sprintId} not found!`);
    }

    res.status(StatusCodes.OK).json({ message: 'sprint deleted'})
};

const edit = async(req, res) => {
    const sprintId = req.query.id;
    var updatedSprint = req.body;
    
    var existingSprint = await SprintModel.findById(sprintId);
    // Adding materials
    if (req.body.material) {
        // Making sure that a person does not assign materials that are not present.
        const choosenMaterials = await materialModel.findById(material.id);

        if (existingSprint.materials.length ===0) {
            existingSprint.materials = [req.body.material];
        } else if (existingSprint.materials.length > 0){
            var existingMaterials = existingSprint.materials;
            existingMaterials.push(req.body.material);
        }
        updatedSprint = existingSprint;
    }

    const request = await SprintModel.findByIdAndUpdate({ _id: sprintId }, updatedSprint);
    const updatedsprint = await SprintModel.findById(request._id);

    if (!updatedsprint) {
        throw new NotFoundError(`Join request not found!`);
    }

    res.status(StatusCodes.OK).json({ message: 'Updated', sprint: updatedsprint})
};

module.exports = { add, getAll, edit, findByProjectId, findByIssueId, findById, remove }