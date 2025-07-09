const { File } = require('../models');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileRecord = await File.create({
      filePath: req.file.path,
      taskId: req.params.taskId,
      uploadedBy: req.user.id
    });

    res.status(201).json({ message: "File uploaded", file: fileRecord });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
