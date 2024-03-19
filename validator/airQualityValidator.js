import {check, validationResult}  from 'express-validator'

export const airQualityOfNearestCityValidator = [
    check('lat').isFloat({ min: -90, max: 90 }).withMessage('Invalid value, expected a number within range [-90, 90]'),
    check('lon').isFloat({ min: -180, max: 180 }).withMessage('Invalid value, expected a number within range [-180, 180]'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(400).json({errors: errors.array()});
        next();
      },
]
