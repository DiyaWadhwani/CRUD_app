const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add registration
 *  @method GET /add-registration
 */
route.get('/add-registration', services.add_registration)

/**
 *  @description for update registration
 *  @method GET /update-registration
 */
route.get('/update-registration', services.update_registration)


// API
route.post('/api/registrations', controller.create);
route.get('/api/registrations', controller.find);
route.put('/api/registrations/:id', controller.update);
route.delete('/api/registrations/:id', controller.delete);


module.exports = route