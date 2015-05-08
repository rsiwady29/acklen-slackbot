/// <reference path="../../../typings/es6-promise/es6-promise.d.ts" />

import rsvp = require('es6-promise');
var Promise = rsvp.Promise;

export IRobotResponse{
	reply(message: string): void;
	send(message: string): void;
	random(arr: Array<any>): any;
}

export class FakeResponse implements IRobotResponse {
  	
  	messageSent: string = "none";
	messageReplied: string = "none";

	private sendResolve: any;

	private sendPromise = new Promise((resolve, reject)=>{
		this.sendResolve = resolve;
		});

	reply = (msg) => {
		this.messageReplied = msg;
	}

	send = (msg) => {
		this.messageSent = msg
		this.sendResolve(msg);
	};

	waitForMessageToBeSent = (): any => {
		return this.sendPromise;
	};

	match: Array<string> = [];

	registerMatches = (matches: Array<string>) => {
		this.match = matches;
	};

	private randomResponseIndex: number = 0;

	random = (arr: Array<any>): any => {
		return arr[this.randomResponseIndex];
	};

	setRandomResponse = (index: number) => {
	 	this.randomResponseIndex = index;
	};
}