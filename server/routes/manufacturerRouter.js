const express = require('express');
const Manufacturer = require('../models/manufacturerSchema');
const { checkAdmin, checkAuthenticated } = require('../middleware/checkRole');
const router = express.Router();

router.get("/", checkAuthenticated, async (req, res) => {
    const manufacturers = await Manufacturer.find();
    res.json({ manufacturers: manufacturers });
});  
  
router.get("/:id", async(req, res) => {
    const manufacturerId = req.params.id;
    const manufacturer = await Manufacturer.findById(manufacturerId);
    res.json({manufacturer : manufacturer});
});


router.post('/add', checkAdmin, async(req, res) => {
    const name = req.body.name;
    const establishedYear = Number(req.body.establishedYear);
    const country = req.body.country;
    const description = req.body.description;
    const logoUrl = req.body.logoUrl;

    if (!establishedYear) {
        res.status(400).send('Established year not in format yyyy');
    }

    const manufacturer = await Manufacturer.create({
        name: name,
        establishedYear: establishedYear,
        country: country,
        description: description,
        logoUrl: logoUrl
    });

    res.json({manufacturer: manufacturer});
});

router.put("/:id", checkAdmin, async(req, res) => {
    const manufacturerId = req.params.id;

    const initial = await Manufacturer.findById(manufacturerId);

    if (req.body.country != null && req.body.country.length > 4) {
    res.status(400).send('Established year not in format yyyy');
    }

    const manufacturer = await Manufacturer.findByIdAndUpdate(manufacturerId, {
    name: req.body.name ?? initial.name,
    establishedYear: req.body.establishedYear ?? initial.establishedYear,
    country: req.body.country ?? initial.country,
    description: req.body.description ?? initial.description,
    logoUrl: req.body.logoUrl ?? initial.logoUrl
    });

    res.json({manufacturer: manufacturer});
});

router.delete("/delete/:id", checkAdmin, async (req, res) => {
    try{
      const manufacturerId = req.params.id;
      const result = await Manufacturer.findByIdAndDelete(manufacturerId);
  
      if (!result)
        return res.status(404).json({message: "Not found"});
  
      return res.status(200).json({message: "OK"});
    }catch (error) {
      res.status(500).json({message: error.message});
    }
  });

module.exports = router;