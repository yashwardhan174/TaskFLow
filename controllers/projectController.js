const { Project, User } = require('../models');

exports.createProject = async (req, res) => {
  const { name, description, status } = req.body;
  const ownerId = req.user.id;

  try {
    const project = await Project.create({
      name,
      description,
      status: status || 'active',
      ownerId
    });

    res.status(201).json({ message: 'Project created successfully', project });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create project', error: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findOne({
      where: { id },
      include: [{ model: User, as: 'owner', attributes: ['id', 'name', 'email'] }]
    });

    if (!project) return res.status(404).json({ message: 'Project not found' });

    res.json({ project });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch project', error: err.message });
  }
};
