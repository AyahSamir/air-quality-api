import express from "express";
import airQualityRoute from './routes/airQualityRoute.js'
import airQualityStatisticsRoute from './routes/airQualityStatisticsRoute.js'
import airQualityTrackerTask from './tasks/airQualityTrackerTask.js'

const app = express()
const APP_URL = process.env.APP_URL
const APP_PORT = process.env.APP_PORT

app.listen(APP_PORT, () => console.log(`Server running on port: ${APP_URL}:${APP_PORT}`));

app.use('/', airQualityRoute);
app.use('/', airQualityStatisticsRoute);

export default app

