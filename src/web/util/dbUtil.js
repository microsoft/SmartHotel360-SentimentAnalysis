"use strict";

var util = require('util');

var Gremlin = require('gremlin');
var config = require("./dbconfig");

async function setupDatabase() {
    var configObject = {
        "session": false,
        "ssl": true,
        "user": `/dbs/${config.database}/colls/${config.collection}`,
        "password": config.primarykey
    };

    const client = Gremlin.createClient(443, config.endpoint, configObject);
    let promisifiedExecute = util.promisify(client.execute.bind(client));

    async function runQueriesSerial(queries) {
        let counter = 0;
        for (let query of queries) {
            console.log("Running query " + counter++ + " of " + queries.length);
            let results;
            try {
                results = await promisifiedExecute(query, {});
            } catch (err) { //if we try to add a node that already exists, we'll get a lot of exceptions... TODO to improve
                if (!err.message.indexOf("Resource with specified id or name already exists")) {
                    console.log(err);
                }
            }
        }
    }
    let baseUsers = [ // some set of names
        "@ThePivitil",
        "@Davidcsa",
        "@SonyaKoptyev",
        "@Kirkshulman",
        "@MSPaolo",
        "@samitj",
        "@evepadrinosanta",
        "@LadyQuestaway",
        "@achimd",
        "@freckfacelace",
        "@joannbuckner",
        "@BethMassi",
        "@shanselman",
        "@craigkitterman",
        "@erikaehrli1",
        "@JamesMontemagno",
        "@bradygaster",
        "@Sachinraj77",
        "@bharatsbhat",
        "@rajen_k",
        "@lyalindotcom",
        "@alexdima123",
        "@njukidreborn",
        "@arthur_ozga",
        "@johannesrieken",
        "@ErichGamma",
        "@MadsTorgersen",
        "@BenjaminPasero",
        "@WesleyWigham",
        "@amandaksilver",
        "@gauravseth",
        "@billticehurst",
        "@christof_marti",
        "@ahejlsberg",
        "@roblourens",
        "@drosenwasser",
        "@paulvanbrenk",
        "@ramyanexus",
        "@chrisdias",
        "@pjmeyer",
        "@bowdenk7"
    ];
    let users = baseUsers.slice(0); //poor man's array clone

    let positiveSentimentScores = [
        7.00,
        7.01,
        7.02,
        7.03,
        7.04,
        7.05,
        7.06,
        7.07,
        7.08,
        7.09,
        7.10,
        7.11,
        7.12,
        7.13,
        7.14,
        7.15,
        7.16,
        7.17,
        7.18,
        7.19,
        7.20,
        7.21,
        7.22,
        7.23,
        7.24,
        7.25,
        7.26,
        7.27,
        7.28,
        7.29,
        7.30,
        7.31,
        7.32,
        7.33,
        7.34,
        7.35,
        7.36,
        7.37,
        7.38,
        7.39,
        7.40,
        7.41,
        7.42,
        7.43,
        7.44,
        7.45,
        7.46,
        7.47,
        7.48,
        7.49,
        7.50,
        7.51,
        7.52,
        7.53,
        7.54,
        7.55,
        7.56,
        7.57,
        7.58,
        7.59,
        7.60,
        7.61,
        7.62,
        7.63,
        7.64,
        7.65,
        7.66,
        7.67,
        7.68,
        7.69,
        7.70,
        7.71,
        7.72,
        7.73,
        7.74,
        7.75,
        7.76,
        7.77,
        7.78,
        7.79,
        7.8,
        7.81,
        7.82,
        7.83,
        7.84,
        7.85,
        7.86,
        7.87,
        7.88,
        7.89,
        7.90,
        7.91,
        7.92,
        7.93,
        7.94,
        7.95,
        7.96,
        7.97,
        7.98,
        7.99,
        8.00,
        8.01,
        8.02,
        8.03,
        8.04,
        8.05,
        8.06,
        8.07,
        8.08,
        8.09,
        8.10,
        8.11,
        8.12,
        8.13,
        8.14,
        8.15,
        8.16,
        8.17,
        8.18,
        8.19,
        8.20,
        8.21,
        8.22,
        8.23,
        8.24,
        8.25,
        8.26,
        8.27,
        8.28,
        8.29,
        8.30,
        8.31,
        8.32,
        8.33,
        8.34,
        8.35,
        8.36,
        8.37,
        8.38,
        8.39,
        8.40,
        8.41,
        8.42,
        8.43,
        8.44,
        8.45,
        8.46,
        8.47,
        8.48,
        8.49,
        8.50,
        8.51,
        8.52,
        8.53,
        8.54,
        8.55,
        8.56,
        8.57,
        8.58,
        8.59,
        8.60,
        8.61,
        8.62,
        8.63,
        8.64,
        8.65,
        8.66,
        8.67,
        8.68,
        8.69,
        8.70,
        8.71,
        8.72,
        8.73,
        8.74,
        8.75,
        8.76,
        8.77,
        8.78,
        8.79,
        8.80,
        8.81,
        8.82,
        8.83,
        8.84,
        8.85,
        8.86,
        8.87,
        8.88,
        8.89,
        8.90,
        8.91,
        8.92,
        8.93,
        8.94,
        8.95,
        8.96,
        8.97,
        8.98,
        8.99,
        9.00,
        9.01,
        9.02,
        9.03,
        9.04,
        9.05,
        9.06,
        9.07,
        9.08,
        9.09,
        9.10,
        9.11,
        9.12,
        9.13,
        9.14,
        9.15,
        9.16,
        9.17,
        9.18,
        9.19,
        9.20,
        9.21,
        9.22,
        9.23,
        9.24,
        9.25,
        9.26,
        9.27,
        9.28,
        9.29,
        9.30,
        9.31,
        9.32,
        9.33,
        9.34,
        9.35,
        9.36,
        9.37,
        9.38,
        9.39,
        9.40,
        9.41,
        9.42,
        9.43,
        9.44,
        9.45,
        9.46,
        9.47,
        9.48,
        9.49,
        9.50,
        9.51,
        9.52,
        9.53,
        9.54,
        9.55,
        9.56,
        9.57,
        9.58,
        9.59,
        9.60,
        9.61,
        9.62,
        9.63,
        9.64,
        9.65,
        9.66,
        9.67,
        9.68,
        9.69,
        9.70,
        9.71,
        9.72,
        9.73,
        9.74,
        9.75,
        9.76,
        9.77,
        9.78,
        9.79,
        9.80,
        9.81,
        9.82,
        9.83,
        9.84,
        9.85,
        9.86,
        9.87,
        9.88,
        9.89,
        9.90,
        9.91,
        9.92,
        9.93,
        9.94,
        9.95,
        9.96,
        9.97,
        9.98,
        9.99,
        10.00
    ];

    let negativeSentimentScores = [
        5.00,
        4.99,
        4.98,
        4.97,
        4.96,
        4.95,
        4.94,
        4.93,
        4.92,
        4.91,
        4.90,
        4.89,
        4.88,
        4.87,
        4.86,
        4.85,
        4.84,
        4.83,
        4.82,
        4.81,
        4.80,
        4.79,
        4.78,
        4.77,
        4.76,
        4.75,
        4.74,
        4.73,
        4.72,
        4.71,
        4.70,
        4.69,
        4.68,
        4.67,
        4.66,
        4.65,
        4.64,
        4.63,
        4.62,
        4.61,
        4.60,
        4.59,
        4.58,
        4.57,
        4.56,
        4.55,
        4.54,
        4.53,
        4.52,
        4.51,
        4.50,
        4.49,
        4.48,
        4.47,
        4.46,
        4.45,
        4.44,
        4.43,
        4.42,
        4.41,
        4.40,
        4.39,
        4.38,
        4.37,
        4.36,
        4.35,
        4.34,
        4.33,
        4.32,
        4.31,
        4.30,
        4.29,
        4.28,
        4.27,
        4.26,
        4.25,
        4.24,
        4.23,
        4.22,
        4.21,
        4.20,
        4.19,
        4.18,
        4.17,
        4.16,
        4.15,
        4.14,
        4.13,
        4.12,
        4.11,
        4.10,
        4.09,
        4.08,
        4.07,
        4.06,
        4.05,
        4.04,
        4.03,
        4.02,
        4.01,
        4.00,
        3.99,
        3.98,
        3.97,
        3.96,
        3.95,
        3.94,
        3.93,
        3.92,
        3.91,
        3.90,
        3.89,
        3.88,
        3.87,
        3.86,
        3.85,
        3.84,
        3.83,
        3.82,
        3.81,
        3.80,
        3.79,
        3.78,
        3.77,
        3.76,
        3.75,
        3.74,
        3.73,
        3.72,
        3.71,
        3.70,
        3.69,
        3.68,
        3.67,
        3.66,
        3.65,
        3.64,
        3.63,
        3.62,
        3.61,
        3.60,
        3.59,
        3.58,
        3.57,
        3.56,
        3.55,
        3.54,
        3.53,
        3.52,
        3.51,
        3.50,
        3.49,
        3.48,
        3.47,
        3.46,
        3.45,
        3.44,
        3.43,
        3.42,
        3.41,
        3.40,
        3.39,
        3.38,
        3.37,
        3.36,
        3.35,
        3.34,
        3.33,
        3.32,
        3.31,
        3.30,
        3.29,
        3.28,
        3.27,
        3.26,
        3.25,
        3.24,
        3.23,
        3.22,
        3.21,
        3.20,
        3.19,
        3.18,
        3.17,
        3.16,
        3.15,
        3.14,
        3.13,
        3.12,
        3.11,
        3.10,
        3.09,
        3.08,
        3.07,
        3.06,
        3.05,
        3.04,
        3.03,
        3.02,
        3.01,
        3.00,
        2.99,
        2.98,
        2.97,
        2.96,
        2.95,
        2.94,
        2.93,
        2.92,
        2.91,
        2.90,
        2.89,
        2.88,
        2.87,
        2.86,
        2.85,
        2.84,
        2.83,
        2.82,
        2.81,
        2.80,
        2.79,
        2.78,
        2.77,
        2.76,
        2.75,
        2.74,
        2.73,
        2.72,
        2.71,
        2.70,
        2.69,
        2.68,
        2.67,
        2.66,
        2.65,
        2.64,
        2.63,
        2.62,
        2.61,
        2.60,
        2.59,
        2.58,
        2.57,
        2.56,
        2.55,
        2.54,
        2.53,
        2.52,
        2.51,
        2.50,
        2.49,
        2.48,
        2.47,
        2.46,
        2.45,
        2.44,
        2.43,
        2.42,
        2.41,
        2.40,
        2.39,
        2.38,
        2.37,
        2.36,
        2.35,
        2.34,
        2.33,
        2.32,
        2.31,
        2.30,
        2.29,
        2.28,
        2.27,
        2.26,
        2.25,
        2.24,
        2.23,
        2.22,
        2.21,
        2.20,
        2.19,
        2.18,
        2.17,
        2.16,
        2.15,
        2.14,
        2.13,
        2.12,
        2.11,
        2.10,
        2.09,
        2.08,
        2.07,
        2.06,
        2.05,
        2.04,
        2.03,
        2.02,
        2.01,
        2.00
    ];

    let keywords = [
        "DiamondHotel",
        "PlatinumHotel",
        "GoldHotel"
    ];

    let tweetCounts = {
        "Diamond Hotel": {
            positiveTweetCounts: [3, 6, 1, 6, 4, 7, 8],
            negativeTweetCounts: [1, 2, 1, 3, 1, 4, 2]
        },
        "Platinum Hotel": {
            positiveTweetCounts: [1, 2, 1, 1, 3, 4, 2],
            negativeTweetCounts: [5, 6, 7, 9, 4, 2, 3]
        },
        "Gold Hotel": {
            positiveTweetCounts: [5, 7, 6, 5, 7, 7, 4],
            negativeTweetCounts: [3, 2, 1, 4, 4, 2, 1]
        }
    }

    let tweets = [];
    tweets = generateHotelTweets(
        tweetCounts["Diamond Hotel"].positiveTweetCounts, 
        tweetCounts["Diamond Hotel"].negativeTweetCounts, 
        "DiamondHotel",
        positiveSentimentScores,
        negativeSentimentScores,
        users,
        baseUsers
    );
    tweets = tweets.concat(generateHotelTweets(
        tweetCounts["Gold Hotel"].positiveTweetCounts,
        tweetCounts["Gold Hotel"].negativeTweetCounts,
        "GoldHotel",
        positiveSentimentScores,
        negativeSentimentScores,
        users,
        baseUsers
    ));
    tweets = tweets.concat(generateHotelTweets(
        tweetCounts["Platinum Hotel"].positiveTweetCounts,
        tweetCounts["Platinum Hotel"].negativeTweetCounts,
        "PlatinumHotel",
        positiveSentimentScores,
        negativeSentimentScores,
        users,
        baseUsers
    ));

    let addVertexQueries = [];
    let addEdgeQueries = [];

    for (let keyword of keywords) {
        addVertexQueries.push(constructAddVertexString('hashtag', keyword));
    }

    for (let user of baseUsers) {
        addVertexQueries.push(constructAddVertexString('user', user));
    }
    
    for (let tweet of tweets) {
        addVertexQueries.push(constructAddVertexString('tweet', tweet.sentiment.toString(), {"text": tweet.text, "sentiment": tweet.sentiment, "date": tweet.date}));
        addEdgeQueries.push(constructAddEdgeString('tweeted', {id: tweet.user, label: 'user'}, {id: tweet.sentiment.toString(), label: 'tweet'}));
        addEdgeQueries.push(constructAddEdgeString('contains', { id: tweet.sentiment, label: 'tweet' }, { id: tweet.hashtag, label: 'hashtag' }));
    }
    
    console.log(addVertexQueries);
    console.log(addEdgeQueries);

    await runQueriesSerial(addVertexQueries);
    console.log("///////////////////// vertices done //////////////////////");
    await runQueriesSerial(addEdgeQueries);
    console.log("///////////////////// edges done //////////////////////");
}

setupDatabase().then(function () {
    console.log("all done");
}).catch(function (err) {
    console.error(err);
});


function generateHotelTweets(positiveTweetCounts, negativeTweetCounts, hashtag, positiveScores, negativeScores, users, baseUserArray) {
    let tweets = [];
    let dates = ["11/9", "11/10", "11/11", "11/12", "11/13", "11/14", "11/15"];

    for (let i = 0; i < positiveTweetCounts.length; i++) {
        for (let j = 0; j < positiveTweetCounts[i]; j++) {
            tweets.push({ user: popRandomUser(users, baseUserArray), sentiment: popRandomSentimentScore(positiveScores), text: "", date: dates[i], hashtag: hashtag});
        }
    }
    for (let i = 0; i < negativeTweetCounts.length; i++) {
        for (let j = 0; j < negativeTweetCounts[i]; j++) {
            tweets.push({ user: popRandomUser(users, baseUserArray), sentiment: popRandomSentimentScore(negativeScores), text: "", date: dates[i], hashtag: hashtag });
        }
    }
    return tweets;
}

function popRandomSentimentScore(sentimentArray) {
    let index = Math.floor(Math.random() * sentimentArray.length);
    return sentimentArray.splice(index,1)[0];
}

function popRandomUser(userArray, baseUserArray) {
    if (userArray.length == 0) {
        userArray = baseUserArray.slice(0);
    }
    let index = Math.floor(Math.random() * userArray.length);
    return userArray.splice(index,1)[0];
}

function constructAddVertexString(label, id, props) {
    let vertexObject = {
        label: label,
        properties: { id: id, _p: "1" }
    };
    if (props) {
        for (let propKey in props) {
            vertexObject.properties[propKey] = props[propKey];
        }
    }

    let queryString = `g.addV('${escStr(vertexObject.label)}')`;
    if (vertexObject.properties) {
        queryString += concatProperties(vertexObject.properties);
    }
    return queryString;
}


/**
 * Creates a gremlin query string from supplied params.
 * @param {string} label 
 * @param {{label: string, id: string}} from 
 * @param {{label: string, id: string}} to
 * @param {{}} props 
 */
function constructAddEdgeString(label, from, to, props) {
    let edgeObject = {
        label: label,
        from: from,
        to: to,
        properties: props
    };

    let queryString = `g.V().hasLabel('${escStr(edgeObject.from.label)}').has('id','${escStr(edgeObject.from.id)}').addE('${escStr(edgeObject.label)}')`;

    if (edgeObject.properties) {
        queryString += concatProperties(edgeObject.properties);
    }
    queryString += `.to(g.V().hasLabel('${escStr(edgeObject.to.label)}').has('id','${escStr(edgeObject.to.id)}'))`;

    return queryString;
}

function concatProperties(properties) {
    let returnStr = "";
    for (let propKey in properties) {
        let value = properties[propKey];
        if (typeof properties[propKey] === 'string') {
            value = escStr(value);
            returnStr = returnStr + `.property('${escStr(propKey)}','${value}')`;
        } else {
            returnStr = returnStr + `.property('${escStr(propKey)}',${value})`;
        }
        
        
    }
    return returnStr;
}

/**
 * Escapes single quotes in strings.
 * @param {string} str 
 */
function escStr(str) {
    if (typeof str == "number") {
        return str;
    }
    return str.replace("'", "\\'");

}
