const express = require('express');
const Wine = require('../models/wineSchema');
const router = express.Router();

router.get("/", async (req, res) => {
  const wines = await Wine.find();
  res.json({ wines: wines });
});

router.get("/:id", async (req, res) => {
  const wineId = req.params.id;
  const wine = await Wine.findById(wineId);
  res.json({ wine: wine });
});

router.post("/add", async (req, res) => {
  const name = req.body.name;
  const price = Number(req.body.price);
  const alcoholPercentage = Number(req.body.alcoholPercentage);
  const type = req.body.type;
  const manufacturer = req.body.manufacturer;

  if (!name || !type || !manufacturer) {
    return res.status(400).send("Name, type, and manufacturer are required");
  }

  if (isNaN(price)) {
    return res.status(400).send("Invalid price format");
  }

  if (isNaN(alcoholPercentage)) {
    return res.status(400).send("Invalid alcohol percentage format");
  }

  const wine = await Wine.create({
    name: name,
    type: type,
    price: Number(price),
    alcoholPercentage: Number(alcoholPercentage),
    manufacturer: manufacturer,
  });

  res.json({ wine: wine });
});


router.put("/:id", async(req, res) => {
  const wineId = req.params.id;
  const initial = await Wine.findById(wineId);
  
  const wine = await Wine.findByIdAndUpdate(wineId, {
    name: req.body.name ?? initial.name,
    type: req.body.type ?? initial.type,
    price: req.body.price ? Number(req.body.price) : initial.price,
    alcoholPercentage: req.body.alcoholPercentage ?  Number(req.body.alcoholPercentage) : initial.alcoholPercentage,
    manufacturer: req.body.manufacturer ?? initial.manufacturer,
  });

  res.json({wine: wine});
});

router.delete("/delete/:id", async (req, res) => {
  try{
    const wineId = req.params.id;
    const result = await Wine.findByIdAndDelete(wineId);

    if (!result)
      return res.status(404).json({message: "Not found"});

    return res.status(200).json({message: "OK"});
  }catch (error) {
    res.status(500).json({message: error.message});
  }
});

module.exports = router;