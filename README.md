# air-quality-api
A REST API for fetching “the air quality information” using [iqair apis](https://iqair.com)

# Overview

## REST APIs

* ### Get Air Quality for the Nearest City

    This endpoint allows users to retrieve the air quality data for the nearest city, given a specific set of GPS coordinates
    by fetching the air data information from the IQAir endpoints.
    IQAir endpoint "v2/nearest_city?" is used to fetch the air information, and then current pollution info is extracted and returned.


* ### Get Most Polluted time for Paris

    This endpoint retrieves information about the most polluted time in Paris based on historical air quality data. 
    Data pollution information for paris (latitude: 48.856613, longitude: 2.352222) is fetched from IQAir endpoint "v2/nearest_city?"
    and inserted every mintue by a cron job to the database.

## Examples

## Get Air Quality for the Nearest City for given lat and lon

### Request

`GET /quality/:lat/:lon`

    curl --location 'http://localhost:8080/quality/48.8566/2.3522'

* :lat (required): The latitude coordinate of the location.
* :lon (required): The longitude coordinate of the location.

### Response

    Status: 200 OK
    Content-Type: application/json

    {
    "Results": {
        "Pollution": {
            "ts": "2024-03-18T15:00:00.000Z",
            "aqius": 8,
            "mainus": "p2",
            "aqicn": 3,
            "maincn": "p2"
            }   
        }
    }

* ts: Timestamp of the air quality data.
* aqius: Air Quality Index (AQI) based on US standards.
* mainus: Main pollutant based on US standards.
* aqicn: Air Quality Index (AQI) based on Chinese standards.
* maincn: Main pollutant based on Chinese standards.

## Get Most Polluted time for Paris

### Request

`GET /getParisMostPollutedTime`

    curl --location 'http://localhost:8080/getParisMostPollutedTime'

### Response

    Status: 200 OK
    Content-Type: application/json

    {
        "Results": {
            "Timestamp": "2024-03-18T15:55:00.999987416Z"
        }
    }


## Air Quality Cron Job

This cron job implementation periodically checks the air quality for the Paris zone every 1 minute and saves the data in the database along with the date and time of the measurement.
Data pollution information for paris (latitude: 48.856613, longitude: 2.352222) is fetched from IQAir endpoint "v2/nearest_city?".

The cron job is configured to run every minute using the following cron expression: '* * * * *'

### Database

InfluxDB is used for storing the air pollution data. InfluxDB is a high-performance time-series database designed for handling large amounts of timestamped data. 

The data is saved in the database with the following schema:

__Measurements__

In InfluxDB, data is organized into measurements. Each measurement represents a distinct type of data being stored. For air quality data, the primary measurement is __"pollution"__.

__Fields__

Fields are used to store the actual data values within measurements. In the "pollution" measurement, the air quality index is defined:

__aqius__: Air Quality Index (AQI) based on US standards. Data type: Float.

__Tags__

Tags are key-value pairs used for indexing and querying data. They provide metadata associated with each data point. For air quality data, the following tags are defined:

__zone__: The geographical zone associated with the air quality data.
__lat__: Latitude coordinate of the location.
__lon__: Longitude coordinate of the location.

__Example Data Point__

Here's an example of how a data point is structured in the "pollution" measurement:

    _time=2024-03-19 21:54:10 GMT+2, _value=14.0, _field=aqius, _measurement=pollution, lat=48.856613, lon=2.352222, zone=paris

This data point represents the air quality index (AQI) for Paris at a specific time.

Data Ingestion

To ingest data into InfluxDB, the writeApi object is used. The useDefaultTags method is called to specify default tags that apply to all data points. This is followed by creating a Point object for each data point, specifying the measurement name and field values.
    
```javascript
writeApi.useDefaultTags({ zone, lat, lon });

const point1 = new Point('pollution')
            .floatField('aqius', aqius);
```
    

# Installation

## Clone the repository:

run the following command on your terminal to clone the repository:

```bash
git clone https://github.com/AyahSamir/air-quality-api

cd air-quality-api
```

## Install the dependencies

Install the dependencies using the following command:

```bash
npm install
```

## Run the application

```bash
npm start
```

## Running tests

```bash
npm test
```

## Running Cron Job

```bash
npm start
```

## Database setup (InfluxDB)

- Follow the documentation here for installing [InfluxDB](https://docs.influxdata.com/influxdb/v2/get-started/setup/) 
- Create an API Token, add the token in .env (INFLUXDB_TOKEN=yourKey)
- Create an inital Organization, add the organization name in .env (INFLUXDB_ORG=yourOrg)
- Create an inital Bucket, add the bucket name in .env (INFLUXDB_BUCKET=yourBucket)
- Specify port number for InfluxDB in .env (INFLUXDB_PORT=portNo)
- Open `http://localhost:PORT` to see the database


# Tasks
- [x] Register in IQAIR
- [x] Implement endpoints (Get Air Quality, Get Paris Most Polluted Time)
- [x] Implement Cron Job for saving pollution data (Get Air Quality, Get Paris Most Polluted Time)
- [x] Setup InfluxDB
- [x] Add Unit tests for endpoints
- [x] Create Postman Collection
- [ ] Add Authentication for APIs
- [ ] Add Cron Job Unit Tests
- [ ] Add Integration Tests
- [ ] Add Swagger for documentation
- [ ] Use Logging library
- [ ] Custom Exceptions for Better Error Handling