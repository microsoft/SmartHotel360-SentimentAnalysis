const cognitiveServices = require('cognitive-services');
const documentClient = require("documentdb").DocumentClient;

const dbId = 'Tweets'
const databaseUrl = `dbs/${dbId}`; //'dbs/Tweets';
const collectionId = 'Tweets'
const collectionUrl = `${databaseUrl}/colls/${collectionId}`;

module.exports = {
    save: function(tweets) {
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
    
    

    analyzeTweetsDummy: function() {
        
        return [{
            _lsn: 280,
            _rid: "AEtLAPvMoQAJAAAAAAAAAA==",
            _self: "dbs/AEtLAA==/colls/AEtLAPvMoQA=/docs/AEtLAPvMoQAJAAAAAAAAAA==/",
            _ts: 1509728450,
            hashtag: "hotel360",
            id: "923936730947784700",
            language: "en",
            sentiment: 9.2,
            text: "@chrisdias - No way this demo works lol... #hotel360 Happy! Positive! Love! Excitement!",
            userAlias: "FluffyDogAttack"
        }]
    },
    saveToGraph: function() {},

    analyzeTweets: async function(tweets) {
        const client = new cognitiveServices.textAnalytics({
            apiKey: process.env.COGNITIVE_SERVICES_API_KEY,
            endpoint: 'westus.api.cognitive.microsoft.com' // This should be moved to a variable.
        });

        var headers = { 'Content-Type': 'application/json' };
        var body = { documents: tweets };

        return client.sentiment({
            headers,
            body
        }).then((results) => {

            results.documents.forEach(async function (item) {
                tweets.find(i => i.id == item.id).sentiment = item.score;
            });

            return tweets;
        }).catch(async err => {
            console.log(err);
        });
    }
}
