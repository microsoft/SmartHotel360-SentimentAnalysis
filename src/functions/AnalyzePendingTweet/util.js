const cognitiveServices = require('cognitive-services');
const documentClient = require("documentdb").DocumentClient;

const dbId = 'Tweets'
const databaseUrl = `dbs/${dbId}`; //'dbs/Tweets';
const collectionId = 'Tweets'
const collectionUrl = `${databaseUrl}/colls/${collectionId}`;

module.exports = {
    save: function (tweets) {
        console.log('saving to cosmos');
        const promises = tweets.map((tweet) => {
            console.log('inserting into: ' + collectionUrl, tweet);
            documentDBClient.createDocument(collectionUrl, tweet, function (err, document) {
                if (err) return console.log(err);
                console.log('Created Document with content: ', document.content);
            });
        });

        Promise.all(promises);
    },

    saveToGraph: function () { },

    analyzeTweets: function (tweets, callback) {
        const client = new cognitiveServices.textAnalytics({
            apiKey: process.env.COGNITIVE_SERVICES_API_KEY,
            endpoint: 'westus.api.cognitive.microsoft.com' // This should be moved to a variable.
        });

        var headers = { 'Content-Type': 'application/json' };
        var body = { documents: tweets };

        client.sentiment({
            headers,
            body
        }).then((results) => {

            results.documents.forEach(function (item) {
                tweets.find(i => i.id == item.id).sentiment = item.score;
            });

            if (callback) {
                callback(tweets);
            }
        }).catch(err => {
            console.log(err);
        });
    }
}