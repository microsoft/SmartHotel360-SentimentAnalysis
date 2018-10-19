var config = {}

// Populate this with the "Gremlin Endpoint" (minus the "https://" and ":443/") of your Cosmos DB.
// It can be found (after you create the resource) in the "Overview" settings.
// Note: Some users find this to say, "FALSE". Not sure why this happens, but after a few minutes, the URL populates in the field.
config.endpoint = "";
// Populate this with the Read-write "Primary Key" of your Cosmos DB.
// It can be found (after you create the resource) in the "Keys" settings.
config.primarykey = "";
// Leave these values alone.
config.database = "TweetsDB";
config.collection = "Tweets";

module.exports = config;
