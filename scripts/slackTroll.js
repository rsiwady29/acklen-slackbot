/// <reference path="../../typings/node/node.d.ts"/>
// Description:
//   Troll the url sharers
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot any url - meme of spongebob no one cares
// Author:
//   Osman Hernandez
var SlackTroll = (function () {
    function SlackTroll(promise) {
        var _this = this;
        this.promise = promise;
        this.trollAction = function (robot) {
            robot.hear(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i, function (msg) {
                var promise = _this.promise("http://version1.api.memegenerator.net/Instance_Create?username=matador&password=matador&languageCode=en&generatorID=45&imageID=39519&text0=Nobody&text1=cares");
                promise.then(function (body) {
                    var memeData = JSON.parse(body);
                    var memeURL = memeData.result.instanceImageUrl;
                    msg.reply(memeURL);
                });
            });
        };
    }
    return SlackTroll;
})();
var httpClient = require("request-promise");
var fn = new SlackTroll(httpClient).trollAction;
module.exports = fn;
