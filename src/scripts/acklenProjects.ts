/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/underscore/underscore.d.ts"/>
// Description
//  A Hubot script written in TypeScript to show information about acklen avenue project
//
// Configuration:
//   None
//
// Commands:
//   hubot create project note ProjectWall
// Author:
//   Rene Rosa <realpasro09@hotmail.com>
//   Frank Rodriguez <frankhn0801@gmail.com>

//module Acklen {
//
//  export class Project{
//    constructor ()
//  }
//}

var fs: any = require('fs');
var _: any = require('underscore');
var mongodb: any = require('mongodb').MongoClient;
var uri = 'mongodb://notesbot:ackl3n@ds041651.mongolab.com:41651/notesbot';

var projects = [];

class Project {

  constructor(robot:any){
  }
  createNotes(msg:any):any {
    var projectName = msg.match[1];
    mongodb.connect(uri, function(err, db){
      if (err){
        console.log('Error: Unable to connect to database');
      }
      db.collection('notes').findOne({"Note Name": { $regex: new RegExp(projectName, "i") }}, function(errFind, document){
        if (document === null){
          db.collection('notes').insert( { "Note Name": projectName }, function(errIns){
            msg.reply('Great!, ' + projectName  +' notes created successfully')
          });
        } else {
          msg.reply('ooops looks like you already create this note')
        }
      });
    });
  }

  addNote (msg: any){
    var variableName: string = msg.match[1];
    var projectName: string  = msg.match[2];
    var value: string = msg.match[3];
    mongodb.connect(uri, function(err, db){
      if (err){
        console.log('Error: Unable to connect to database');
      }
      db.collection('notes').findOne({"Note Name": { $regex: new RegExp(projectName, "i") }}, function(errFind, document){
        if (document === null){
          msg.reply("Hey fellow " + projectName +
                    " is not added as a project note, you can create a new" +
                    " note project with the command: create notes for [NoteName]");
        }else{
          var newNote = {};
          newNote[variableName] = value;
          db.collection('notes').update({"Note Name": { $regex: new RegExp(projectName, "i") }}, {$set:newNote}, function(errUpdate){
            msg.reply('Note ' + variableName + ' added to ' + projectName);
          });
        }
      });
    });
  }

  listNotesDetail(msg:any){
    var projectName: string  = msg.match[1];

    mongodb.connect(uri, function(err, db){
      if (err){
        console.log('Error: Unable to connect to database');
      }
      db.collection('notes').findOne({"Note Name": { $regex: new RegExp(projectName, "i") }}, function(errFind, document){
        if (document === null){
          msg.reply("ok yo got me :grin: !, I don't have information about this note");
        }else{
          var response: string ='';
          var properties = Object.keys(document);

          for (var key in properties) {
            var propertyName = properties[key];
            response += properties[key] + ": " + document[propertyName] + "\n";
          }

          msg.reply(response);
        }
      });
    });
  }

  listAll(msg:any){
    mongodb.connect(uri, function(err, db){
      if (err){
        console.log('Error: Unable to connect to database');
      }
      db.collection('notes').find(function(errFind, documents){
        var response: string = '';
        documents.toArray(function(errFind, notes){
          if (notes.length > 0){
            for (var note in notes) {
              response += parseInt(note) + 1 + ". " + notes[note]["Note Name"] + "\n";
            }
            response += "If you want to see the detail of each note project just try: \n"
            response += "[NoteName] notes detail"
            msg.send(response);
          } else{
            msg.send("there aren't notes, try adding one with the command: create notes for [NoteName]");
          }
        });
      });
    });
  }

  editNotes(msg: any){
    var property: string = msg.match[1];
    var projectName: string = msg.match[2];
    var newValue: string = msg.match[3];

    mongodb.connect(uri, function(err, db){
      if (err){
        console.log('Error: Unable to connect to database');
      }
      db.collection('notes').findOne({"Note Name": { $regex: new RegExp(projectName, "i") }}, function(errFind, document){
        if (document === null){
          msg.reply("ok yo got me :grin: !, I don't have information about this note");
        }else{
          if (document[property] === undefined) {
            msg.reply("Note " + property + " does not exist in " + projectName + "!" );
          }else{
            var editedNote = {};
            editedNote[property] = newValue;
            db.collection('notes').update({"Note Name": { $regex: new RegExp(projectName, "i")}}, {$set:editedNote}, function(err){
              msg.reply("You have edited note " + property + " in " + projectName);
            });
          }
        }
      });
    });
  }

  help(msg: any){
     var response: any = '';
      response += "Hi Fellow, these are the available commands for notes script: \n";
      response += "1. create notes for [NoteName] \n";
      response += "2. add [NoteNameDetail] in [NoteName] with [NoteValueDetail] \n";
      response += "3. [NoteName] notes detail \n";
      response += "4. edit [NoteNameDetail] in [NoteName] with [NoteValueDetail] \n"
      response += "5. list all notes"
      msg.reply(response);
  }
}

function AcklenProjects(robot: any) {

  var project = new Project(robot);

  robot.respond(/create notes for (.*)/i, (msg: any) => {
    project.createNotes(msg);
  });

  robot.respond(/add (.*) in (.*) with (.*)/i, (msg: any) => {
    project.addNote(msg);
  });

  robot.respond(/list all notes/i, (msg:any) =>{
    project.listAll(msg);
  });

  robot.respond(/(.*) notes detail/i, (msg:any) =>{
    project.listNotesDetail(msg);
  });

  robot.respond(/edit (.*) in (.*) with (.*)/i, (msg: any) => {
    project.editNotes(msg);
   });

  robot.respond(/notes help/i, (msg: any) => {
    project.help(msg);
   });
}

export = AcklenProjects;
