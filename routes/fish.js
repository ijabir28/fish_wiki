const router = require('express').Router();

const fish_controller = require('../controllers/fish');

router.get("/:species", fish_controller.getSpeciesData);

module.exports = router;
