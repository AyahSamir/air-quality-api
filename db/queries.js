import { InfluxDB, Point } from '@influxdata/influxdb-client'

const INFLUXDB_ORG = process.env.INFLUXDB_ORG
const INFLUXDB_BUCKET = process.env.INFLUXDB_BUCKET

const token = process.env.INFLUXDB_TOKEN
const url = process.env.APP_URL + ':' + process.env.INFLUXDB_PORT

const influxDBclient = new InfluxDB({url, token})

/**
 * Inserts air quality (aqius) for a given zone
 * @param {string} zone - zone name
 * @param {float} lat - latitdue for given zone
 * @param {float} lon - longitude for given zone
 * @param {number} aqius - air quality index for given zone now
 */
export async function insertAirQuality(zone, lat, lon, aqius){
  try{
    const writeApi = influxDBclient.getWriteApi(INFLUXDB_ORG, INFLUXDB_BUCKET)
    writeApi.useDefaultTags({ zone, lat, lon })

    const point1 = new Point('pollution')
    .floatField('aqius', aqius)

    writeApi.writePoint(point1)

    writeApi.close().then(() => {
      console.log(`Data for ${zone} inserted succesfully at ${Date.now()}`)
    }).catch(error => {
      console.log(error);
    });
 
  }
  catch(error) {
    console.error('Error fetching request', error);
    throw error;
  };
}

/**
 * Get the most polluted (max aqius) time for the given zone 
 * @param {string} zone - zone
 * @returns {time} Timestamp of the most polluted time for the given zone
 */
export async function getMostPollutedTime (zone){
  try{
    const queryApi = influxDBclient.getQueryApi(INFLUXDB_ORG)

    const fluxQuery = 
      `from(bucket: "${INFLUXDB_BUCKET}")
        |> range(start: 0)
        |> filter(fn: (r) =>
          r._measurement == "pollution" and
          r.zone == "${zone}"
        )
        |> max(column: "_value")`

      const myQuery = async () => {
      for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
        const row = tableMeta.toObject(values)
        return row._time
      }
    }
    return await myQuery()
  }
  catch(error) {
    console.error('Error fetching request', error);
    throw error;
  };
}