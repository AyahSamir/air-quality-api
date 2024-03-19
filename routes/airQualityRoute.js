import express from "express";

import { getAirQualityOfNearestCity } from '../controller/airQualityController.js'
import { airQualityOfNearestCityValidator } from '../validator/airQualityValidator.js'

const router = express.Router();

router.get('/quality/:lat/:lon', airQualityOfNearestCityValidator, getAirQualityOfNearestCity);

export default router
