import axios from "axios";

const IQAIR_URL = process.env.IQAIR_URL
const IQAIR_KEY = process.env.IQAIR_KEY

/**
 * Get Air Data for the Nearest City for given lat and lon
 * @param {float} latitude - The latitude.
 * @param {float} latitude - The longitude.
 * @returns {object} Air Data information for the Nearest City
 */
export async function getAirDataOfNearestCity(lat, lon){
    try{
        const params = {
            lat: lat,
            lon: lon,
            key: IQAIR_KEY
          };
        const response  = await axios.get(IQAIR_URL, { params });
        return response.data.data;
    }
    catch(error) {
        throw error;
    };
}