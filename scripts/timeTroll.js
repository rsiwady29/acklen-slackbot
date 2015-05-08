// Description
//   Checks for stale trello cards in a given board/list and nags the chat room until it is updated.
//
// Configuration:
//   HUBOT_TRELLO_KEY - Trello application key
//   HUBOT_TRELLO_TOKEN - Trello API token
//
// Commands:
//   hubot timeTroll set boardId {boardShortCode, ex: PYGBctHp}
//   hubot timeTroll set listName {The List Name}
//
// URLS:
//   GET /path?param=<val> - <what the request does>
//
// Notes:
//   To get your key, go to: https://trello.com/1/appKey/generate
//   To get your token, go to: https://trello.com/1/authorize?key=<<your key>>&name=Hubot+Trello&expiration=never&response_type=token&scope=read,write
//   Figure out what board you want to use, grab it's id from the url (https://trello.com/board/<<board name>>/<<board id>>)
//   To get your list ID, go to: https://trello.com/1/boards/<<board id>>/lists?key=<<your key>>&token=<<your token>>  "id" elements are the list ids.
//
// Author:
//   bsommardahl

module.exports = function(robot){

	var _ = require('underscore');
	var q = require('q');
	var moment = require('moment');
	
	var cronJob = require('cron').CronJob
	var tz = 'America/Chicago'
	new cronJob('*/30 * * * * *', checkTrelloForOldCardsInDevelopment, null, true, tz)

	Trello = require("node-trello")
	t = new Trello(process.env.HUBOT_TRELLO_KEY, process.env.HUBOT_TRELLO_TOKEN)

  	function getList(boardId, listName){
  		return getBoard(boardId).then(function(b){
  			return getOneFromTrello("/1/boards/" + b.id + "/lists", {}, function(l){
				return l.name === listName;
			});
		});
  	}

  	function getBoard(boardId){
  		return getOneFromTrello("/1/members/me/boards", {}, function(b){  
  			return b.shortLink === boardId;
  		});
  	}

  	function getCards(list){
  		return getManyFromTrello("/1/lists/" + list.id + "/cards", { "card_fields": "dateLastActivity" });
  	};

  	function getCardsFromList(boardId, listName){
  		return getList(boardId, listName)  			
  			.then(function(list){
  				return getCards(list);
  			});	
  	}

  	function notifyCardIsStale(channel, card){
		robot.messageRoom(channel, '[' + card.name + '](' + card.url + ') is stale! Should it be paused?');
  	};

  	function getFromTrello(url, options){
  		var deferred = q.defer();		
		t.get(url, options, function(error, data){ 
			if(error){
				console.log("Error for " + url);
				console.log(error);
				deferred.reject(new Error('#{url} failed. #{error}'));								
			}else if(!data.length){
				console.log("No items found for " + url);
				deferred.reject(new Error('#{url} resulted in 0 results.'));
			}else{
				deferred.resolve(data);
			}
		});
		return deferred.promise;
  	}

  	function getOneFromTrello(url, options, query){
  		return getFromTrello(url, options).then(function(items){
  			var found = _.find(items, query);
  			return found;
  		});
  	}

  	function getManyFromTrello(url, options, query){
		return getFromTrello(url, options, function(items){
  			if(!query) return items;

  			return _.filter(items, query);
  		});
  	}

  	function checkListForStaleCards(channel, boardId, listName){
		getCardsFromList(boardId, listName).then(function(cards){
			cards.forEach(function(card){
				if(moment(card.dateLastActivity) < moment().add(1, 'hour'))
				{
					notifyCardIsStale(channel, card);	
				}
			});						
  		});		
  	}

	function checkTrelloForOldCardsInDevelopment(){
		var channels = robot.brain.data.channels;
		if(!channels) return;

		Object.keys(channels).forEach(function(key){
			var channel = channels[key];
			if(!channel.boardId){
				console.log(channel.name + " does not have a boardId.");
				return;
			}
			if(!channel.listName){
				console.log(channel.name + " does not have a listName.");
				return;
			}
			checkListForStaleCards(channels.name, channel.boardId, channel.listName);
		});		
	}
	
	robot.respond(/timeTroll set (\w+) (.*)/i, function(msg){
		var thingToSet = msg.match[1];
		if(!thingToSet) {
			msg.send("timeTroll is not sure what you want to set.");
			return;
		}
		var valueOfTheThing = msg.match[2];
		if(!valueOfTheThing) {
			msg.send("timeTroll is not sure how you want to set " + thingToSet + ".");
			return;
		}
		
		robot.brain.data.channels = robot.brain.data.channels || [];

		var channelName = msg.message.room;
		var channel = robot.brain.data.channels[channelName];
    	if(!channel){
    		robot.brain.data.channels[channelName] = {
    			name : channelName
    		};    		
    	}

    	robot.brain.data.channels[channelName][thingToSet] = valueOfTheThing;

    	msg.respond("Thanks. Added " + thingToSet + "=" + valueOfTheThing + " to " + channelName);
	});  
}