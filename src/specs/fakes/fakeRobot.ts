var _ = require("underscore");

export interfact IRobot{
	hear(exp: RegExp, response: IRobotResponse): void;
	respond(exp: RegExp, response: IRobotResponse): void;
}

export class FakeRobot implements IRobot {

	private testResponses = [];
	
	hear(exp: RegExp, msg: IRobotResponse){
		var matching = _.find(this.testResponses, (r)=>{
			return exp.test(r.text);
			});

		if(matching){
			msg(matching.response);
		}
	}

	respond(exp: RegExp, msg: IRobotResponse){
		var matching = _.find(this.testResponses, (r)=>{
			return exp.test(r.text);
			});

		if(matching){
			var matches = matching.text.match(exp);
			matching.response.registerMatches(matches);
			msg(matching.response);
		}
	}

	overhears(text: string, response: IRobotResponse){
		this.testResponses.push({text: text, response: response});
	}
}