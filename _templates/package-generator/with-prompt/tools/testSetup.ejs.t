---
to: packages/<%=year%>-<%=packageTitle%>/tools/testSetup.js
---
/* eslint-disable import/no-extraneous-dependencies */
process.env.NODE_ENV = "test";

const { identity } = require("ramda");

[".css", ".png", ".jpg", ".svg", ".gif"].forEach(ext => {
  require.extensions[ext] = identity;
});

require("@babel/register")();

const chai = require("chai");
const sinon = require("sinon");
const jsdom = require("jsdom");
const sinonChai = require("sinon-chai");
const chaiEnzyme = require("chai-enzyme");
const chaiAsPromised = require("chai-as-promised");

const { JSDOM } = jsdom;

const exposedProperties = ["window", "navigator", "document"];

const { document } = new JSDOM(``, {
  url: "http://localhost"
}).window;
global.document = document;

chai.should();
chai.use(sinonChai);
chai.use(chaiEnzyme());
chai.use(chaiAsPromised);

global.navigator = {
  userAgent: "node.js",
  platform: "Node"
};
global.assert = chai.assert;
global.expect = chai.expect;
global.chai = chai;
global.sinon = sinon;
global.window = document.defaultView;

Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === "undefined") {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

documentRef = document; // eslint-disable-line no-undef
