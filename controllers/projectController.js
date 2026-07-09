import Project from '../models/Project.js'

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.status(200).json({ success: true, data: projects })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
}

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }
    res.status(200).json({ success: true, data: project })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' })
  }
}

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json({ success: true, data: project })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }
    res.status(200).json({ success: true, data: project })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }
    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' })
  }
}