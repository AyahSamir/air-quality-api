import express from "express";

import { getParisMostPollutedTime } from '../controller/airQualityStatisticsController.js'

const router = express.Router();

router.get('/getParisMostPollutedTime', getParisMostPollutedTime);

export default router
