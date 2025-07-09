const { Team, TeamMember, User } = require('../models');

exports.createTeam = async (req, res) => {
  const { name, projectId } = req.body;

  try {
    const team = await Team.create({ name, projectId });
    res.status(201).json({ message: 'Team created', team });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create team', error: err.message });
  }
};

exports.addTeamMembers = async (req, res) => {
  const { teamId } = req.params;
  const { members } = req.body;

  try {
    for (const member of members) {
      const [record, created] = await TeamMember.findOrCreate({
        where: { teamId, userId: member.userId },
        defaults: { role: member.role }
      });

      if (!created) {
        await record.update({ role: member.role });
      }
    }

    res.status(201).json({ message: 'Team members added/updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add team members', error: err.message });
  }
};

exports.getTeamMembersByProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const teams = await Team.findAll({
      where: { projectId },
      include: {
        model: User,
        as: 'members',
        attributes: ['id', 'name', 'email'],
        through: { attributes: ['role'] }
      }
    });

    res.json({ teams });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch team members', error: err.message });
  }
};
