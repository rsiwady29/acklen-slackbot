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

//  it("should respond to create notes for SpecProject and response Great!, SpecProject notes created successfully", () => {
//    var resp = new FakeResponse();
//    this.robot.overhears("create notes for SpecProject", resp);
//    AcklenProject(this.robot);
//    setTimeout(function(){
//      expect(resp.messageReplied).to.equal("Great!, SpecProject notes created successfully");
//    }, 300);
//  });
//
//it("should respond to add note Devs in SpecProject with Frank,Aida,Viktor,Douglas and response Great SpecProject notes created successfully", () => {
//    var resp = new FakeResponse();
//    this.robot.overhears("add note Devs in SpecProject with Frank,Aida,Viktor,Douglas", resp);
//    AcklenProject(this.robot);
//    setTimeout(function(){
//      expect(resp.messageReplied).to.equal("Devs added to SpecProject");
//    }, 300);
//  });
//
//it("should respond to edit note Devs in SpecProject with Douglas and response You have edited note Devs in SpecProject", () => {
//    var resp = new FakeResponse();
//    this.robot.overhears("edit note Devs in SpecProject with Douglas", resp);
//    AcklenProject(this.robot);
//    setTimeout(function(){
//      expect(resp.messageReplied).to.equal("You have edited note Devs in SpecProject");
//    }, 300);
//  });
//
//it("should respond to delete note SpecProject and response Note SpecProject removed successfully", () => {
//    var resp = new FakeResponse();
//    this.robot.overhears("delete note SpecProject", resp);
//    AcklenProject(this.robot);
//    setTimeout(function(){
//      expect(resp.messageReplied).to.equal("Note SpecProject removed successfully");
//    }, 300);
//  });

it("should respond to notes help with List of the project notes'", () => {
    var resp = new FakeResponse();
    this.robot.overhears("notes help", resp);
    AcklenProject(this.robot);
    var response: any = '';
      response += "Hi Fellow, these are the available commands for notes script: \n";
      response += "1. create notes for [NoteName] \n";
      response += "2. add [NoteNameDetail] in [NoteName] with [NoteValueDetail] \n";
      response += "3. [NoteName] notes detail \n";
      response += "4. edit [NoteNameDetail] in [NoteName] with [NoteValueDetail] \n"
      response += "5. delete note [NoteName] \n"
      response += "6. list all notes"
    expect(resp.messageReplied).to.equal(response);
  });
});
