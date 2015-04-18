/// <reference path="../../typings/node/node.d.ts"/>

import ms = require("../helpers/messageSender");
import ts = require("../helpers/trelloService");
import github = require("../helpers/githubService");
class Merge {	
    constructor(private messageSender: ms.ISendMessages, private tresloService: ts.ITrelloService, private githubService: github.IGithubServices ){
    }
    
	registerListener = (robot: any) => {
		robot.respond(/Merge ?(.*)/i, (msg: any) => {
			var cardName = msg.match[1]
			     
                var values =  this.tresloService.moveCard(cardName, "ready for testing");
            
            this.githubService.merge(cardName);
            
             this.messageSender.send(msg, cardName +"is in ready for testing");
            
            
            });
            
				
        };
}


var httpClient = require("request-promise")

var MessageSender = ms.MessageSender;
var TrelloService = ts.TrelloService
var GitHubServices = github.GithubServices;
var fn = new Merge(new MessageSender(), new TrelloService(httpClient), new GitHubServices(httpClient)).registerListener
export = fn