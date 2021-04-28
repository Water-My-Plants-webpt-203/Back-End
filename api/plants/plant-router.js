const router = require('express').Router();
const restricted = require('../auth/auth-middleware.js');
const plantModel = require('../plants/plant-model.js');
const path = require('path');
const fs = require('fs');

router.get('/:plant_id', restricted,  async (req, res) => {
    try{
        const plant = await plantModel.findById(req.params.plant_id);
        res.status(200).json(plant);
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.get('/:user_id/plants', restricted, async (req, res) => {
    try{
        const plant = await plantModel.findByUserId(req.params.user_id);
        res.status(200).json(plant);
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.post('/:user_id/plants', restricted, async (req, res) => {
    try{
        const user_id = req.params.user_id;
        if(req.files){
            const file = req.files.plantImg;
            const fileExt = file.name.split('.').pop();
            console.log(fileExt);
            if(fileExt.toLowerCase() == "jpeg" || fileExt.toLowerCase() == "jpg"){
                let dirPath = path.dirname(require.main.filename) + '\\api\\images\\' +user_id;
                let imageName = file.name.substr(0, file.name.lastIndexOf('.')) + Date.now()+ '.' + fileExt;
                let imageLocation = dirPath + '\\' + imageName;
                if(fs.existsSync(dirPath)){
                    if(file){
                        file.mv(imageLocation);
                    }
                }
                else{
                    fs.mkdir(dirPath,function(error){
                        if(error){
                            console.log(error);
                        }
                    });
                    if(file){
                        file.mv(imageLocation);
                    }
                }
                req.body.image = user_id + '/' + imageName;
                await plantModel.insert(req.params.user_id, req.body);
                res.status(201).json({ message: "Plant created successfully."});
            }
            else{
                res.status(400).json({ message: "Only JPEG or JPG file allowed."});
            }
        }
        else{
            req.body.image = 'default/default.jpg';
            await plantModel.insert(req.params.user_id, req.body);
            res.status(201).json({ message: "Plant created successfully."});
        }
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.put('/:plant_id', restricted,  async (req, res) => {
    try{
        await plantModel.updateById(req.params.plant_id, req.body);
        res.status(201).json({ message: `Plant ${req.params.plant_id} was successfully updated.`})
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:plant_id', restricted,  async (req, res) => {
    try{
        await plantModel.remove(req.params.plant_id);
        res.status(201).json({ message: `Plant ${req.params.plant_id} was successfully deleted.`})
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;