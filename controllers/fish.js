const fish_services = require('../services/fish');

exports.cacheData = async function (req, res, next) {
    const species = req.params.species;

    fish_services.cacheData(species)
        .then(function (results) {
            if (results) {
                res.send({
                    fromCache: true,
                    data: JSON.parse(results),
                });
            } else {
                next();
            }
        }).catch(function (error) {
        console.error(error);
        res.status(404);
    })
}

exports.getSpeciesData = async function getSpeciesData(req, res) {
    const species = req.params.species;

    fish_services.getSpeciesData(species)
        .then(function (response) {
            res.send(response);
        }).catch(function (error) {
        console.error(error);
        res.status(404).send("Data unavailable");
    });
};
