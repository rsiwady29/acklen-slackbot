/// <reference path="../../typings/node/node.d.ts"/>
// Description
//  An Awesome hubot script
//
// Configuration:
//   None
//
// Commands:
//   hubot hello - responds 'Howdy!'
//
// Author:
//   Richard Siwady   <richard@acklenavenue.com>
//   Douglas Guerrero <dguerrero@acklenavenue.com>


import parseDb = require("../helpers/parseDB");

class Abscent {
	
    // We should get this from some sort of a DB
    commands: string[] = ['AFK', 'BRB'];
    adjectives: string[] = ['for', 'in', 'until', 'back'];
    format: string[] = ['min', 'hour', 'day'];
    regex:any;
        
    constructor(private HubotParseDb: parseDb.IIHubotParseDb) {
       this.regex = new RegExp(
        '\\b(' + this.commands.join('|') + ')\\s+(' +
                 this.adjectives.join('|') +
                 ')\\s+([0-9]+)\\s+(' +
                 this.format.join('|') + ')\\b', 'i');    
    }

  	hubotAction = (robot: any) => {  
        
        robot.hear(/.*/i,
            (msg:any) => {
                var user:any = msg.message.user;
                var object:any = this.regex.exec(msg.message.text);

                if(object !== null ) {
                    var command = {
                        User: user.name,
                        Command: object[1],
                        Time: parseInt(object[3]),
                        Format: object[4]
                    };                    
                    msg.send(msg, this.HubotParseDb.saveAbscence(command));
                }
            });

        robot.respond(/abscence help/i,
            (msg:any)=>{
                msg.send('http://hola.com');
            });
        
        robot.hear(/(^|\W)@\w+/g,
            (msg: any) => {

                for(var i = 0; i < msg.match.length; i++){
                    var user = msg.match[i];
                    user = user.substring(1, user.length);                

                    this.HubotParseDb.checkIsAbscent(msg, user);
                }
            });
        
        robot.hear(/\b(Im back|back)\b/g,
            (msg: any) => {
                var user = msg.message.user;
                this.HubotParseDb.userIsBack(user.name);
            });        
    }
}

var HubotParseDb = parseDb.HubotParseDb;

var fn = new Abscent(new HubotParseDb()).hubotAction
export = fn




