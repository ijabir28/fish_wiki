const axios = require("axios");
const redis = require("redis");

let redisClient;

(async () => {
    redisClient = redis.createClient({});

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    await redisClient.connect();
})();

exports.cacheData = async function (species) {
    return await redisClient.get(species);
};

exports.getSpeciesData = async function (species) {
    let results = await fetchApiData(species);

    if (results.length === 0) {
        throw "API returned an empty array";
    }

    await redisClient.set(species, JSON.stringify(results), {
        EX: 180,
        NX: true,
    });

    return {
        fromCache: false,
        data: results,
    }
};

async function fetchApiData(species) {
    const apiResponse = await axios.get(
        `https://www.fishwatch.gov/api/species/${species}`
    );
    console.log("Request sent to the API");
    return apiResponse.data;
};