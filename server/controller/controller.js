var Registration = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new registration
    const registration = new Registration({
        brandName : req.body.brandName,
        productName : req.body.productName,
        aboutBrand: req.body.aboutBrand,
        aboutProduct : req.body.aboutProduct
    })

    // save registration in the database
    registration
        .save(registration)
        .then(data => {
            //res.send(data)
            res.redirect('/');
        })
        .catch(err =>{
            res.status(500).send({
                message : `Some error occurred while creating a new user --> ${err.message}`
            });
        });

}

// retrieve and return all registrations/ retrive and return a single registration
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Registration.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({message : `Cannot find user with ID ${id}`})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: `Some error occurred while retrieving user with ID ${id}`})
            })

    }else{
        Registration.find()
            .then(registration => {
                res.send(registration)
            })
            .catch(err => {
                res.status(500).send({ message : `Some error occurred while retrieving user with ID ${id} --> ${err.message}`})
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Registration.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot update user with ID ${id}`})
            }else{
                res.send(data)
                res.redirect('/');
            }
        })
        .catch(err =>{
            res.status(500).send({ message : `Some error occurred while updating user with ID ${id} --> ${err.message}`})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Registration.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message : `Could not delete user with ID ${id} --> ${err.message}`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message : `Some error occurred while deleting user with ID ${id} --> ${err.message}`
            });
        });
}