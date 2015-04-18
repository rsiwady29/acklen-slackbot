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
var projects: any = JSON.parse(fs.readFileSync('project.json', 'utf8'));

class Project {


  constructor(robot:any){
  }
  createNotes(msg:any):any {
    var projectName = msg.match[1];
      var project = _.filter(projects, function(p:any){
        return p.name.toLowerCase() === projectName.toLowerCase();
      });
      if (project.length === 0){
        var myjson = {'name': projectName };
        projects.push(myjson);
        fs.writeFile('project.json', JSON.stringify(projects));
        msg.reply('Great ' + projectName  +' notes were created successfully')
      } else {
        msg.reply('ooops looks like you already have this project note')
      }
  }

  addNote (msg: any){
    var variableName: string = msg.match[1];
    var projectName: string  = msg.match[2];
    var value: string = msg.match[3];
    var projectExist: boolean =false;

    _.each(projects, function(p:any){
      if(p.name.toLowerCase() === projectName.toLowerCase())
      {
        p[variableName] = value;
        projectExist = true;
      }
    })
    if (projectExist){
      fs.writeFile('project.json', JSON.stringify(projects));
      msg.reply(variableName + ' added to ' + projectName);
    } else{
      msg.send("Hey fellow " + projectName + " is not added as a project note, you can create a new  note project with the command: create notes for [Name of the Project note]");
    }
  }

  listNotesDetail(msg:any){
    var projectName: string  = msg.match[1];

    var project = _.filter(projects, function(p:any){
      return p.name.toLowerCase() === projectName.toLowerCase();
    });

    if (project.length === 0){
      msg.send("ok yo got me, I dont have information about this project note :(");
    }
    else{
      var response: string ='';
      var properties = Object.keys(project[0]);

      for (var key in properties) {
        var propertyName = properties[key];
        response += properties[key] + ": " + project[0][propertyName] + "\n";
      }
      msg.send(response);
    }
  }

  listAll(msg:any){
    if (projects.length === 0){
      msg.send("there are not notes, try adding one with the command: create notes for [Name Of Note Project]");
    }
    else{
      var response: string = '';
      for (var project in projects) {
        response += parseInt(project) + 1 + ". " + projects[project].name + "\n";
      }
      response += "If you want to see the detail of each note project just try: \n"
      response += "list [ProjectName] notes"
      msg.send(response);
    }
  }

  editNotes(msg: any){
    var property: string = msg.match[1];
       var projectName: string = msg.match[2];
       var newValue: string = msg.match[3];

       var project = _.filter(projects, function(p:any) {
           return p.name.toLowerCase() === projectName.toLowerCase();
       });


       if (project.length === 0) {
           msg.send("ok yo got me, I don't have information about this project :(");
       }
       else {

           if (project[0][property].length === 0) {
               msg.send("ok yo got me, I don't have information about this note :(");
           }
           else {
               var response: string = '';

               _.each(projects, function(p:any) {
                   if (p.name.toLowerCase() === projectName.toLowerCase()) {
                       p[property] = newValue;
                   }
               })

               fs.writeFile('project.json', JSON.stringify(projects));

               msg.send("You have edited " + property + " in " + projectName);

           }
       }

  }

  help(msg: any){
     var response: any = '';
      response += "Hi Fellow, these are the available commands for notes script: \n";
      response += "1. create notes for [project note name] \n";
      response += "2. add note [note name] to [project note name] with [value] \n";
      response += "3. list [project note name] notes \n";
      response += "4. edit [note name] in [project note name] with [value] \n"
      response += "5. list me all note projects"
      msg.send(response);
  }
}

function AcklenProjects(robot: any) {

  var project = new Project(robot);

  robot.respond(/create notes for (.*)/i, (msg: any) => {
    project.createNotes(msg);
  });

  robot.respond(/add note (.*) to (.*) with (.*)/i, (msg: any) => {
    project.addNote(msg);
  });

  robot.respond(/list (.*) notes/i, (msg:any) =>{
    project.listNotesDetail(msg);
  });

  robot.respond(/list me all note projects/i, (msg:any) =>{
    project.listAll(msg);
  });

  robot.respond(/edit (.*) in (.*) with (.*)/i, (msg: any) => {
    project.editNotes(msg);
   });

  robot.respond(/notes help/i, (msg: any) => {
    project.help(msg);
   });
}

export = AcklenProjects;
