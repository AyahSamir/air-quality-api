import cron from 'node-cron';

import { getAirDataOfNearestCity } from '../client/iqairClient.js'
import { insertAirQuality } from '../db/queries.js';

const CRON_JOB_INTERVAL = process.env.CRON_JOB_AIR_QUALITY_INTERVAL

/**
 * Cron Job to check “air quality“ info for Paris city and save it to db
 */

class CronJob {
  constructor() {
    this.startJob();
  }

  async startJob() {
    cron.schedule(
      CRON_JOB_INTERVAL,
      async () => {
        console.log('Running air quality task every minute');
        const lat = '48.856613';
        const lon = '2.352222';
        const city = 'paris';

        try {
          const data = await getAirDataOfNearestCity(lat, lon)
          insertAirQuality(city, lat, lon, data.current.pollution.aqius)
        }catch(error) {
          console.log(error)
        }
      }
    );
  }
}

export default new CronJob();