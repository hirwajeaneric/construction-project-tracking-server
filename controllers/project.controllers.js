const ProjectModel = require('../models/project.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors/index');

const add = async (req, res) => {
    const project = await ProjectModel.create(req.body);
    res.status(StatusCodes.CREATED).json({ message: 'Booking Created', project })
};

const getAll = async(req, res) => {
    const projects = await ProjectModel.find({})
    res.status(StatusCodes.OK).json({ nbHits: projects.length, projects })
};

const findByName = async(req, res) => {
    const {name} = req.query;
    const project = await ProjectModel.find({name});
    if (!project) {
        throw new BadRequestError(`Project not found!`);
    }
    res.status(StatusCodes.OK).json({ project });
};

const findById = async(req, res) => {
    const projectId = req.query.id;
    const project = await ProjectModel.findById(projectId);
    if (!project) {
        throw new BadRequestError(`Project not found!`);
    }
    res.status(StatusCodes.OK).json({ project });
};

const remove = async(req, res) => {
    const projectId = req.query.id;
    const deletedProject = await ProjectModel.findByIdAndRemove({ _id: projectId});

    if (!deletedProject) {
        throw new NotFoundError(`Project with id ${projectId} not found!`);
    }

    res.status(StatusCodes.OK).json({ message: 'Project deleted'})
};

const edit = async(req, res) => {
    const projectId = req.query.id;
    var project = await ProjectModel.findByIdAndUpdate(projectId, req.body);
    if (!project) {
        throw new NotFoundError(`Project not found!`);
    }
    var updatedProject = await ProjectModel.findById(project._id);
    res.status(StatusCodes.OK).json({ message: 'Project updated', updatedProject })
};

module.exports = { add, getAll, edit, findById, findByName, remove };