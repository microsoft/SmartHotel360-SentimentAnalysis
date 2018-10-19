const config = require('./util/dbconfig');
const Gremlin = require('gremlin');
var Promise = require("bluebird");

module.exports = async function () {
    let result;
    var configObject = {
        "session": false,
        "ssl": true,
        "user": `/dbs/${config.database}/colls/${config.collection}`,
        "password": config.primarykey
    };

    const client = Gremlin.createClient(443, config.endpoint, configObject);
    const gremlin = Gremlin.makeTemplateTag(client);

    const runQuery = async () => {
        let data = {
            dates: ['11/9', '11/10', '11/11', '11/12', '11/13', '11/14', '11/15'],
            "Diamond Hotel": {
                positiveTweetCounts: [0, 0, 0, 0, 0, 0, 0],
                negativeTweetCounts: [0, 0, 0, 0, 0, 0, 0]
            }, 
            "Platinum Hotel": {
                positiveTweetCounts: [0, 0, 0, 0, 0, 0, 0],
                negativeTweetCounts: [0, 0, 0, 0, 0, 0, 0]
            }, 
            "Gold Hotel": {
                positiveTweetCounts: [0, 0, 0, 0, 0, 0, 0],
                negativeTweetCounts: [0, 0, 0, 0, 0, 0, 0]
            }  
        };
        let diamond = gremlin`g.V().has('id', 'DiamondHotel').both()`;
        let platinum = gremlin`g.V().has('id', 'PlatinumHotel').both()`;
        let gold = gremlin`g.V().has('id', 'GoldHotel').both()`;
        
        let results = await Promise.all([diamond, platinum, gold]);

        let hotels = ["Diamond Hotel", "Platinum Hotel", "Gold Hotel"];
        let count = 0;
        for (let tweets of results) {
            let negativeCount = 0;
            let positiveCount = 0;
            let sum = 0;
            for (let tweet of tweets) {
                let positive = [];
                let negative = [];
                let sentiment = tweet.properties.sentiment[0].value;
                let dateIndex = data.dates.indexOf(tweet.properties.date[0].value);
                sum += sentiment;
                if (sentiment > 7) {
                    data[hotels[count]].positiveTweetCounts[dateIndex]++;
                    positiveCount++;
                } else {
                    data[hotels[count]].negativeTweetCounts[dateIndex]--;
                    negativeCount++;
                }
                data[hotels[count]].positiveTotal = positiveCount;
                data[hotels[count]].negativeTotal = negativeCount;
                data[hotels[count]].average = sum / (positiveCount + negativeCount);
            }
            count++;
        }
        let resultConcat = [];
        for (let resultArray of results) {
            resultConcat = resultConcat.concat(resultArray);
        }
        let tweetData = [];
        for (result of resultConcat) {
            tweetData.push({
               // text: result.properties.text[0].value,
                sentiment: result.properties.sentiment[0].value
            });
        }
        return {tweets: tweetData, counts: data};
    }

    try {
        let res = await runQuery();
        return res;
    } catch (error) {
        return error;
    }

}


