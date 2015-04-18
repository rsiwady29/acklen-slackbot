/// <reference path="../../typings/node/node.d.ts"/>

import ms = require("../helpers/messageSender");
import ts = require("../helpers/trelloService");
import github = require("../helpers/githubService");
class FinishDeveloping {	
    constructor(private messageSender: ms.ISendMessages, private tresloService: ts.ITrelloService, private githubService: github.IGithubServices ){
    }
    
	registerListener = (robot: any) => {
		robot.respond(/Finish Developing ?(.*)/i, (msg: any) => {
			var cardName = msg.match[1]
			     
                var values =  this.tresloService.moveCard(cardName, "ready for code review");
                    
        
            var pullRequest = this.githubService.createPullRequest("Code review: " + cardName, cardName, "development", "Merge me, master.");
            
            pullRequest.then((body)=>{

                var response = JSON.parse(body);
                this.messageSender.send(msg, cardName +"is in ready for code review, check the pull request here: '" +response.html_url+"'");
            });
            
				
        });
	}
}

var httpClient = require("request-promise")

var MessageSender = ms.MessageSender;
var TrelloService = ts.TrelloService
var GitHubServices = github.GithubServices;
var fn = new FinishDeveloping(new MessageSender(), new TrelloService(httpClient), new GitHubServices(httpClient)).registerListener
export = fn