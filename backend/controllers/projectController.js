const asyncHandler = require('express-async-handler');

const Project = require('../models/projectModel');
const User = require('../models/userModel');

// @desc     Get projects
// @route    GET /api/projects
// @access   Private
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({ users: { $in : [req.user.id]}});
    //const projects = await Project.find().populate({ path: 'users', match: { _id: { $gte: [req.user.id]}}}).exec();

    
    res.status(200).json(projects);
})

// @desc     Get one project by id
// @route    GET /api/projects/:id
// @access   Private
const getOneProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(400);
        throw new Error('Project not found');
    }

    //Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    //Make sure the authorized users includes the logged in user
    let foundUser = false;
    for (let i = 0; i < project.toObject().users.length; i++) {
        if (!foundUser && project.toObject().users[i] === req.user.id || (project.toObject().users[i]._id && project.toObject().users[i]._id.toString() === req.user.id)) {
            foundUser = true
            res.status(200).json(project);
        }
    }
    if (!foundUser) {
        res.status(401);
        throw new Error('User not authorized');
    }
})

// @desc     Create project
// @route    POST /api/projects
// @access   Private
//TODO check this
const setProject = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a project name');
    }
    
    const project = await Project.create({
        text: req.body.text,
        users: [req.user.id],
        sections: [],
    })
    res.status(200).json(project);
})

// @desc     Update project
// @route    PUT /api/projects/:id
// @access   Private
const updateProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        res.status(400);
        throw new Error('Project not found');
    }

    //Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    //Make sure the authorized users includes the logged in user
    let foundUser = false;
    for (let i = 0; i < project.toObject().users.length; i++) {
        if (!foundUser && project.toObject().users[i] === req.user.id || (project.toObject().users[i]._id && project.toObject().users[i]._id.toString() === req.user.id)) {
            foundUser = true
        }
    }
    if (!foundUser) {
        res.status(401);
        throw new Error('User not authorized');
    }

    let updatedProject;
    if (req.body.hasOwnProperty('section')) {
        req.body.section.users = [req.user.id]
        const updatedArr = project.toObject().sections
        updatedArr.push(req.body.section)
        updatedProject = await Project.findByIdAndUpdate(req.params.id, {sections: updatedArr}, {new: true,})
    }
    else if (req.body.hasOwnProperty('user')) {
        let userInProject = false;
        for (let i = 0; i < project.toObject().users.length; i++) {
            if (project.toObject().users[i]._id && project.toObject().users[i]._id.toString() === req.body.user._id.toString()) {
                userInProject;
                res.status(400);
                throw new Error("User is already in this project");
            }
        }
        if (!userInProject) {
            const updatedArr = project.toObject().users
            updatedArr.push(req.body.user)
            updatedProject = await Project.findByIdAndUpdate(req.params.id, {users: updatedArr}, {new: true,})
        }
    }
    else if (req.body.hasOwnProperty('sectionID')) {
        for (let i = 0; i < project.toObject().sections.length; i++) {
            if (project.toObject().sections[i]._id.toString() === req.body.sectionID) {
                const updatedArr = project.toObject().sections;
                updatedArr[i].tasks.push({text: req.body.text, users: [req.user.id]})
                updatedProject = await Project.findByIdAndUpdate(req.params.id, {sections: updatedArr}, {new: true,});
            }
        }
    }
    else if (req.body.hasOwnProperty('dragData')) {
        const projectObj = project.toObject()
        //dragging lists
        if(req.body.dragData.type === "list"){
            //returns array with the removed list
            const section = projectObj.sections.splice(req.body.dragData.source.index, 1);
            //insert at destination index
            projectObj.sections.splice(req.body.dragData.destination.index, 0, ...section);
        }

        ///insamelist
        else if(req.body.dragData.source.droppableId === req.body.dragData.destination.droppableId){
            const section = projectObj.sections.find(section => req.body.dragData.source.droppableId.toString() === section._id.toString());
            const task = section.tasks.splice(req.body.dragData.source.index, 1);
            section.tasks.splice(req.body.dragData.destination.index, 0, ...task);
        }

        ///in diff list
        else if(req.body.dragData.source.droppableId !== req.body.dragData.destination.droppableId){
            const sectionStart = projectObj.sections.find(section => req.body.dragData.source.droppableId.toString() === section._id.toString());
            const task = sectionStart.tasks.splice(req.body.dragData.source.index, 1);
            const sectionEnd = projectObj.sections.find(section => req.body.dragData.destination.droppableId.toString() === section._id.toString());
            sectionEnd.tasks.splice(req.body.dragData.destination.index, 0, ...task);
        }
        updatedProject = await Project.findByIdAndUpdate(req.params.id, {sections: projectObj.sections}, {new: true,});
    }
    else if(req.body.hasOwnProperty('removeCardId')) {
        const projectObj = project.toObject();
        for (let i = 0; i < projectObj.sections.length; i++) {
            for (let j = 0; j < projectObj.sections[i].tasks.length; j++) {
                if (projectObj.sections[i].tasks[j]._id.toString() === req.body.removeCardId.toString())
                    projectObj.sections[i].tasks.splice(j, 1);
            }
        }
        updatedProject = await Project.findByIdAndUpdate(req.params.id, {sections: projectObj.sections}, {new: true,});
    }
    else if(req.body.hasOwnProperty('removeSectionId')) {
        const projectObj = project.toObject();
        for (let i = 0; i < projectObj.sections.length; i++) {
            if (projectObj.sections[i]._id.toString() === req.body.removeSectionId.toString()) {
                projectObj.sections.splice(i, 1);
            }
        }
        updatedProject = await Project.findByIdAndUpdate(req.params.id, {sections: projectObj.sections}, {new: true,});
    }
    res.status(200).json(updatedProject);
})

// @desc     Delete project
// @route    DELETE /api/projects/:id
// @access   Private
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(400);
        throw new Error('Goal not found');
    }

    
    //Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    //Make sure the authorized users includes the logged in user
    if (!project.toObject().users.includes(req.user.id)) {
        res.status(401);
        throw new Error('User not authorized');
    }
    
    await project.remove();
    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getProjects,
    getOneProject,
    setProject,
    updateProject,
    deleteProject,
}