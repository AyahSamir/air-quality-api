import { getMostPollutedTime } from '../db/queries.js'

/**
 * Get the date and time when a given zone is polluted 
 * Calculated with the highest "aqius"
 * @returns {timestamp} timestamp when given zone is most polluted
 */
export async function getParisMostPollutedTime(req, res){
    const zone = 'paris';

    getMostPollutedTime(zone).then(
        time => {
            res.send({"Results" : { "Timestamp": time } });
        }).catch(error => {
            res.status(500).send({"Error": "Error Getting Data"})
        });
}