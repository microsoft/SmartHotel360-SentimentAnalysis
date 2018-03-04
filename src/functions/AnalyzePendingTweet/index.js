//ts-check
const documentClient = require("documentdb").DocumentClient;
const dbUtil = require("./util.js");
var Gremlin = require('gremlin');
var config = require("./dbconfig");
var nodeUtil = require('util');

module.exports = function (context, input) {
    const tweets = input;

    context.log('Analyzing Tweets...', tweets);

    // use Azure Cognitive Services to determine sentiment score
    const analyzedTweets = dbUtil.analyzeTweets(tweets, (analyzedTweets) => {
        // save tweets and sentiments to the Graph
        saveToGraph(analyzedTweets);
    });

    context.log("Tweets analyzed and stored.");
    context.done();
}

function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

function saveToGraph(tweets) {
    console.log('Start save to Cosmos graph:');
    console.log('Establishing connection to database...');
    var configObject = {
        "session": false,
        "ssl": true,
        "user": `/dbs/${config.database}/colls/${config.collection}`,
        "password": config.primaryKey
    };

    const client = Gremlin.createClient(443, config.endpoint, configObject);
    console.log('Connection established');

    let queries = [];
    for (let tweet of tweets) { //need to check if these exist
        queries.push(constructAddVertexString('user', tweet.user));
        queries.push(constructAddVertexString('tweet', tweet.id, { text: tweet.text, sentiment: tweet.sentiment }));
        if (isIterable(tweet.hashtags)) {
            for (let hashtag of tweet.hashtags) {
                queries.push(constructAddVertexString('hashtag', hashtag));
            }
        }
        queries.push(constructAddEdgeString(
            'tweeted',
            { label: 'user', id: tweet.user },
            { label: 'tweet', id: tweet.id }
        ));

        if (isIterable(tweet.hashtags)) {
            for (let hashtag of tweet.hashtags) {
                queries.push(constructAddEdgeString(
                    'contains',
                    { label: 'tweet', id: tweet.id },
                    { label: 'hashtag', id: hashtag }
                ));
            }
        }
    }

    for (let query of queries) {
        console.log(query);

        client.execute(query, (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
            }
        });
    }
    console.log("Done adding data to graph");
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
 * @param {[]} props 
 */
function constructAddEdgeString(label, from, to, props) {
    let edgeObject = {
        label: label,
        from: from,
        to: to,
        properties: props
    };

    let queryString = `g.V().hasLabel('${escStr(edgeObject.from.label)}').V('${escStr(edgeObject.from.id)}').addE('${escStr(edgeObject.label)}')`;

    if (edgeObject.properties) {
        queryString += concatProperties(edgeObject.properties);
    }
    queryString += `.to(g.V().hasLabel('${escStr(edgeObject.to.label)}').V('${escStr(edgeObject.to.id)}'))`;

    return queryString;
}

function concatProperties(properties) {
    let returnStr = "";
    for (let propKey in properties) {
        let value = properties[propKey];
        if (typeof properties[propKey] == 'string') {
            value = escStr(value);
        }
        returnStr = returnStr + `.property('${escStr(propKey)}','${value}')`;
    }
    return returnStr;
}

/**
 * Escapes single quotes in strings.
 * @param {string} str
 */
function escStr(str) {
    return str.replace("'", "\\'");

}
