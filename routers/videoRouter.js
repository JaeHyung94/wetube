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
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

// videoRouter.get(routes.videos, videos);
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEdiVideo);

videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
