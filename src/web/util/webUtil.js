exports.getHappinessLevel = function(rating) {
    var level = {
        percentage: Math.trunc(rating * 100)
    };

    if (rating < 0.2) {
        level.faceImage = '/assets/images/level5.svg';
        level.cssClass = 'tweets-happiness_level5';
    }
    else if (rating < 0.4) {
        level.faceImage = '/assets/images/level4.svg';
        level.cssClass = 'tweets-happiness_level4';
    }
    else if (rating < 0.6) {
        level.faceImage = '/assets/images/level3.svg';
        level.cssClass = 'tweets-happiness_level3';
    }
    else if (rating < 0.8) {
        level.faceImage = '/assets/images/level2.svg';
        level.cssClass = 'tweets-happiness_level2';
    }
    else {
        level.faceImage = '/assets/images/level1.svg';
        level.cssClass = 'tweets-happiness_level1';
    }

    return level;
};


exports.sentimentPercentages = [
    {
        faceImage: '/assets/images/level1.svg',
        percentage: '70%',
        cssClass: 'tweets-happiness_level1'
    },
    {
        faceImage: '/assets/images/level2.svg',
        percentage: '21%',
        cssClass: 'tweets-happiness_level2'
    },
    {
        faceImage: '/assets/images/level3.svg',
        percentage: '4%',
        cssClass: 'tweets-happiness_level3'
    },
    {
        faceImage: '/assets/images/level4.svg',
        percentage: '3.2%',
        cssClass: 'tweets-happiness_level4'
    },
    {
        faceImage: '/assets/images/level5.svg',
        percentage: '1.8%',
        cssClass: 'tweets-happiness_level5'
    }
];

exports.getHashtagCounts = function(tweets) {
    let tags = [];
    for (let tweet of tweets) {
        let index = tags.indexOf(tweet.hashtag);
        if (index < 0) {
            tags.push({
                hashtag: tweet.hashtag,
                count: 1
            });
        } else {
            tags[index].count++;
        }
    }
    return tags;
}