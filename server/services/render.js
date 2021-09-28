const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/registrations
    axios.get('http://localhost:3000/api/registrations')
        .then(function(response){
            res.render('index', { registrations : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_registration = (req, res) =>{
    res.render('add_registration');
}

exports.update_registration = (req, res) =>{
    axios.get('http://localhost:3000/api/registrations', { params : { id : req.query.id }})
        .then(function(registeredData){
            res.render("update_registration", { registrations : registeredData.data})
        })
        .catch(err =>{
            res.send(err);
        })
}