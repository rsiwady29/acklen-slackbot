import AcklenProject = require('../scripts/acklenProjects');
import rob = require('./fakes/FakeRobot');
var FakeRobot = rob.FakeRobot;
import res = require('./fakes/FakeResponse');
var FakeResponse = res.FakeResponse;
import chai = require('chai');
var expect = chai.expect;
var fs = require('fs');

describe("The notes Hubot script", () => {

  beforeEach(() => {
    this.robot = new FakeRobot();
  });

  it("should respond to create notes for ProjectWall and response Great ProjectWall notes created successfully'", () => {
    var resp = new FakeResponse();
    this.robot.overhears("create notes for ProjectWall", resp);
    AcklenProject(this.robot);
    expect(resp.messageReplied).to.equal("Great ProjectWall notes created successfully");
  });

it("should respond to add note Devs to ProjectWall with Frank,Aida,Viktor,Douglas and response Great ProjectWall notes created successfully'", () => {
    var resp = new FakeResponse();
    this.robot.overhears("add note Devs to ProjectWall with Frank,Aida,Viktor,Douglas", resp);
    AcklenProject(this.robot);
    expect(resp.messageReplied).to.equal("Devs added to ProjectWall");
    fs.writeFileSync('project.json', '[]');
  });

it("should respond to notes help with List of the project notes'", () => {
    var resp = new FakeResponse();
    this.robot.overhears("notes help", resp);
    AcklenProject(this.robot);
    var response: any = '';
      response += "Hi Fellow, these are the available commands for notes script: \n";
      response += "1. create notes for [project note name] \n";
      response += "2. add note [note name] to [project note name] with [value] \n";
      response += "3. list [project note name] notes \n";
      response += "4. edit [note name] in [project note name] with [value] \n";
      response += "5. list me all note projects";
    expect(resp.messageReplied).to.equal(response);
  });
});
