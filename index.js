#!/usr/bin/env node
'use strict';
const createProxy = require('./proxy');
const argv = require('minimist')(process.argv.slice(2));
const defaults = require('./defaults');

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
