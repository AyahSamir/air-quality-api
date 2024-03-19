import express from 'express'
import request from 'supertest'
import axios from "axios";
import {jest} from '@jest/globals'

import { airDataOfNearestCitySuccessResponse, airDataOfNearestCityFailureResponse } from './data/airQualityResponse.js'
import airQualityRouter from '../routes/airQualityRoute.js';

jest.mock('axios');

const app = new express();
app.use('/', airQualityRouter);

describe('GET /quality/:lat/:lon', () => {
    
    beforeAll(()=>{
        //Mock IQAIR Successful endpoint
        axios.get = jest.fn().mockResolvedValue({ data: airDataOfNearestCitySuccessResponse })
    });
        
    it('should return air quality data when valid lat and lon are provided', async () => {
        const response = await request(app).get('/quality/48.8566/2.3522');
        expect(response.status).toBe(200);
    });

    it('should return error message when out of range lat is provided', async () => {
        // Make a request to the endpoint with invalid lat and lon
        const response = await request(app).get('/quality/-180/2.3522');

        // Assert the response
        expect(response.status).toBe(400); 
    });

    it('should return error message when out of range lon is provided', async () => {
        // Make a request to the endpoint with invalid lat and lon
        const response = await request(app).get('/quality/48.8566/200');

        // Assert the response
        expect(response.status).toBe(400); 
    });

    it('should return air quality data when min range for lat is provided', async () => {
        // Make a request to the endpoint with invalid lat and lon
        const response = await request(app).get('/quality/-90/2.3522');

        // Assert the response
        expect(response.status).toBe(200); 
    });

    it('should return air quality data when min range for lon is provided', async () => {
        // Make a request to the endpoint with invalid lat and lon
        const response = await request(app).get('/quality/48.8566/-180');

        // Assert the response
        expect(response.status).toBe(200); 
    });

    it('should return error message when invalid lat and lon are provided', async () => {
        // Make a request to the endpoint with invalid lat and lon
        const response = await request(app).get('/quality/invalid/invalid');

        // Assert the response
        expect(response.status).toBe(400); 
    });

    it('should return error message when invalid lat and lon are provided', async () => {
        // Make a request to the endpoint with invalid lat and lon
        const response = await request(app).get('/quality/undefined/2.2222');

        // Assert the response
        expect(response.status).toBe(400); 
    });    
});