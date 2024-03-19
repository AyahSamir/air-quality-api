import { getAirDataOfNearestCity } from '../client/iqairClient.js'

/**
 * Get Air Quality for the Nearest City for given lat and lon
 * @param {float} lat - The latitude.
 * @param {float} lon - The longitude.
 * @returns {object} Air Quality information for the Nearest City
 */
export async function getAirQualityOfNearestCity(req, res){
    const { lat } = req.params;
    const { lon } = req.params;

    await getAirDataOfNearestCity(lat, lon).then(
        data => {
            res.send({"Results" : { "Pollution": data.current.pollution } });
    }).catch(error => {
        if(error.response){
            res.status(500).send({ "Error": `Error Getting Data for lat:${lat} lon:${lon},
                                    cause: ${error.response.data.data?.message}`})
        }
    });
}