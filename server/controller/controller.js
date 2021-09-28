var Registration = require('../model/model');

// create and save new registration
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
        aboutProduct : req.body.aboutProduct,
        productType : req.body.productType
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
                message : `Some error occurred while entering a new registration --> ${err.message}`
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
                    res.status(404).send({message : `Cannot find registration with ID ${id}`})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: `Some error occurred while retrieving registration with ID ${id}`})
            })

    }else{
        Registration.find()
            .then(registration => {
                res.send(registration)
            })
            .catch(err => {
                res.status(500).send({ message : `Some error occurred while retrieving registration with ID ${id} --> ${err.message}`})
            })
    }

    
}

// Update a new idetified registration by id
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
                res.status(404).send({ message : `Cannot update registration with ID ${id}`})
            }else{
                res.send(data)
                res.redirect('/');
            }
        })
        .catch(err =>{
            res.status(500).send({ message : `Some error occurred while updating registration with ID ${id} --> ${err.message}`})
        })
}

// Delete a registration with specified id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Registration.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message : `Could not delete registration with ID ${id} --> ${err.message}`})
            }else{
                res.send({
                    message : "Registration was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message : `Some error occurred while deleting registration with ID ${id} --> ${err.message}`
            });
        });
}