export const createGenericController = (Model) => {
  const getAll = async (req, res) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 })
      res.status(200).json({ success: true, data: items })
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch items' })
    }
  }

  const getOne = async (req, res) => {
    try {
      const item = await Model.findById(req.params.id)
      if (!item) {
        return res.status(404).json({ error: 'Item not found' })
      }
      res.status(200).json({ success: true, data: item })
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch item' })
    }
  }

  const create = async (req, res) => {
    try {
      const item = await Model.create(req.body)
      res.status(201).json({ success: true, data: item })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  const update = async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
      if (!item) {
        return res.status(404).json({ error: 'Item not found' })
      }
      res.status(200).json({ success: true, data: item })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  const remove = async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id)
      if (!item) {
        return res.status(404).json({ error: 'Item not found' })
      }
      res.status(200).json({ success: true, data: {} })
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete item' })
    }
  }

  return { getAll, getOne, create, update, remove }
}