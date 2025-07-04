const { Comment, User } = require('../models');

exports.addComment = async (req, res) => {
  const { taskId } = req.params;
  const { text, parentCommentId } = req.body;

  try {
    const comment = await Comment.create({
      text,
      taskId,
      userId: req.user.id,
      parentCommentId: parentCommentId || null
    });

    res.status(201).json({ message: 'Comment added', comment });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add comment', error: err.message });
  }
};

exports.getCommentsForTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const comments = await Comment.findAll({
      where: { taskId, parentCommentId: null },
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        {
          model: Comment,
          as: 'replies',
          include: [{ model: User, as: 'user', attributes: ['id', 'name'] }]
        }
      ]
    });

    res.json({ comments });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comments', error: err.message });
  }
};
