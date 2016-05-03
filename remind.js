var twilio = require('twilio'),
    twilioClient = twilio('twitio-sid', 'twilio-secret'),
    numberToNotify = "number to send sms",
    numberFromNotify = "twilio number",
    twitch = require("node-twitchtv"),
    twitchAccount = { client_id: "twitch_id", scope: "user_read, channel_read_"},
    twitchClient = new twitch(twitchAccount),
    checkAccs = [ //accs to check
        'dexie1337',
        'dota2ruhub',
        'arteezy',
        'dreadztv'
    ];

setInterval(function(){
    checkAccs.forEach(function(acc){
        checkStream(acc);
    });
    console.log('checked');
}, 1000*60); //timeout in ms

function checkStream(acc){
    twitchClient.streams({ channel: acc }, function(err, response) {
        if(response.stream){
            notify(acc);
        }
    });
}

function notify(acc){
    twilioClient.sendMessage({
        to: numberToNotify,
        from: numberFromNotify,
        body: 'Hey! ' + acc + ' is streaming!'
    });
}
