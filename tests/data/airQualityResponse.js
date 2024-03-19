export const airDataOfNearestCitySuccessResponse = {
        "status": "success",
        "data": {
            "city": "X",
            "state": "Ile-de-France",
            "country": "France",
            "location": {
                "type": "Point",
                "coordinates": [
                    2.351666,
                    48.859425
                ]
            },
            "current": {
                "pollution": {
                    "ts": "2024-03-16T14:00:00.000Z",
                    "aqius": 12,
                    "mainus": "p2",
                    "aqicn": 4,
                    "maincn": "p2"
                },
                "weather": {
                    "ts": "2024-03-16T14:00:00.000Z",
                    "tp": 14,
                    "pr": 1023,
                    "hu": 57,
                    "ws": 4.63,
                    "wd": 250,
                    "ic": "02d"
                }
            }
        }
    }

export const airDataOfNearestCityFailureResponse = {
    "status": "fail",
    "data": {
        "message": "city_not_found"
    }
}
