// This file is for pulling in JS files from the `scripts` folder
// Include any scripts here that will be used on every part of the blog, not page specfic scripts
// Run the js:build script to bundle this into `bundle.js` for inclusion on the pages
window.__vCfg = {};
var insertDate = require('./scripts/insertDate')();
var activePage = require('./scripts/activePage')();
var social = require('./scripts/social')();

insertDate();
activePage();
social.revealSocialLinks();
social.hideSocialButtons();
