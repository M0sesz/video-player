const VideoSchema = require("../models/videoModel");

exports.addVideo = async (req, res) => {
  const { title, description } = req.body;
  const videoPath = req.file.path.replace(/\\/g, "/");

  console.log(req.file);

  const video = new VideoSchema({
    title,
    description,
    filename: req.file.filename,
    videoUrl: `/public/videos/${req.file.filename}`,
  });

  try {
    await video.save();
    res.status(200).json({
      message: "Video uploaded succesfully",
      video,
    });
  } catch (err) {
    res.status(400).json({
      message: "Video upload failed",
      err,
    });
  }
};

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await VideoSchema.find({});
    res.status(200).json({
      videos,
    });
  } catch (err) {
    res.status(400);
    err;
  }
};
