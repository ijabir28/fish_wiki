const fish_services = require('../services/fish');

exports.getSpeciesData = async function getSpeciesData(req, res) {
    const species = req.params.species;

    fish_services.getSpeciesData(species)
        .then(function (response) {
            res.send(response);
        }).catch (function (error) {
        console.error(error);
        res.status(404).send("Data unavailable");
    });
};
