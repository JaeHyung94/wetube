import express from "express";
import routes from "../routes";
import {
  videos,
  editVideo,
  deleteVideo,
  videoDetail,
  postUpload,
  getUpload,
  getEditVideo,
  postEdiVideo
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

// videoRouter.get(routes.videos, videos);
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEdiVideo);

videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;
