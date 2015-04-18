/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../typings/node/node.d.ts"/>
/// <reference path="../../typings/chai-as-promised/chai-as-promised.d.ts" />

import chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;
import TrelloService = require('../helpers/TrelloService');
import FakeHttpClient = require('./fakes/FakeHttpClient');
