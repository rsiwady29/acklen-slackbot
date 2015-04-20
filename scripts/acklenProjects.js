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
var fs = require('fs');
var _ = require('underscore');
var projects = JSON.parse(fs.readFileSync('project.json', 'utf8'));
var Project = (function () {
    function Project(robot) {
    }
    Project.prototype.createNotes = function (msg) {
        var projectName = msg.match[1];
        var project = _.filter(projects, function (p) {
            return p.name.toLowerCase() === projectName.toLowerCase();
        });
        if (project.length === 0) {
            var myjson = { 'name': projectName };
            projects.push(myjson);
            fs.writeFileSync('project.json', JSON.stringify(projects));
            msg.reply('Great ' + projectName + ' notes created successfully');
        }
        else {
            msg.reply('ooops looks like you already have this project note');
        }
    };
    Project.prototype.addNote = function (msg) {
        var variableName = msg.match[1];
        var projectName = msg.match[2];
        var value = msg.match[3];
        var projectExist = false;
        _.each(projects, function (p) {
            if (p.name.toLowerCase() === projectName.toLowerCase()) {
                p[variableName] = value;
                projectExist = true;
            }
        });
        if (projectExist) {
            fs.writeFileSync('project.json', JSON.stringify(projects));
            msg.reply(variableName + ' added to ' + projectName);
        }
        else {
            msg.reply("Hey fellow " + projectName + " is not added as a project note, you can create a new  note project with the command: create notes for [Name of the Project note]");
        }
    };
    Project.prototype.listNotesDetail = function (msg) {
        var projectName = msg.match[1];
        var project = _.filter(projects, function (p) {
            return p.name.toLowerCase() === projectName.toLowerCase();
        });
        if (project.length === 0) {
            msg.reply("ok yo got me, I dont have information about this project note :(");
        }
        else {
            var response = '';
            var properties = Object.keys(project[0]);
            for (var key in properties) {
                var propertyName = properties[key];
                response += properties[key] + ": " + project[0][propertyName] + "\n";
            }
            msg.reply(response);
        }
    };
    Project.prototype.listAll = function (msg) {
        if (projects.length === 0) {
            msg.send("there are not notes, try adding one with the command: create notes for [Name Of Note Project]");
        }
        else {
            var response = '';
            for (var project in projects) {
                response += parseInt(project) + 1 + ". " + projects[project].name + "\n";
            }
            response += "If you want to see the detail of each note project just try: \n";
            response += "list [ProjectName] notes";
            msg.send(response);
        }
    };
    Project.prototype.editNotes = function (msg) {
        var property = msg.match[1];
        var projectName = msg.match[2];
        var newValue = msg.match[3];
        var project = _.filter(projects, function (p) {
            return p.name.toLowerCase() === projectName.toLowerCase();
        });
        if (project.length === 0) {
            msg.reply("ok yo got me, I don't have information about this project :(");
        }
        else {
            if (project[0][property].length === 0) {
                msg.reply("ok yo got me, I don't have information about this note :(");
            }
            else {
                var response = '';
                _.each(projects, function (p) {
                    if (p.name.toLowerCase() === projectName.toLowerCase()) {
                        p[property] = newValue;
                    }
                });
                fs.writeFileSync('project.json', JSON.stringify(projects));
                msg.reply("You have edited " + property + " in " + projectName);
            }
        }
    };
    Project.prototype.help = function (msg) {
        var response = '';
        response += "Hi Fellow, these are the available commands for notes script: \n";
        response += "1. create notes for [project note name] \n";
        response += "2. add note [note name] to [project note name] with [value] \n";
        response += "3. list [project note name] notes \n";
        response += "4. edit [note name] in [project note name] with [value] \n";
        response += "5. list me all note projects";
        msg.reply(response);
    };
    return Project;
})();
function AcklenProjects(robot) {
    var project = new Project(robot);
    robot.respond(/create notes for (.*)/i, function (msg) {
        project.createNotes(msg);
    });
    robot.respond(/add note (.*) to (.*) with (.*)/i, function (msg) {
        project.addNote(msg);
    });
    robot.respond(/list (.*) notes/i, function (msg) {
        project.listNotesDetail(msg);
    });
    robot.respond(/list me all note projects/i, function (msg) {
        project.listAll(msg);
    });
    robot.respond(/edit (.*) in (.*) with (.*)/i, function (msg) {
        project.editNotes(msg);
    });
    robot.respond(/notes help/i, function (msg) {
        project.help(msg);
    });
}
module.exports = AcklenProjects;
