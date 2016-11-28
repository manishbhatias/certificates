#!/usr/bin/env node --harmony

const chalk = require('chalk');
const config = require('../config');
const sendCertificate = require('../lib/send-certificate')(config);

const db = require('level')(config.db);
const queue = require('level-jobs')(db, sendCertificate, {
    maxConcurrency: 5,
    maxRetries: 1
});

queue.on('drain', function () {
    console.log(chalk.bold('Certificates have been sent!'));
    process.exit(0);
})

queue.on('error', function (err) {
    console.log(chalk.red('Error: %s'), err.message);
})

queue.on('retry', function (err) {
    console.log(chalk.yellow('Retrying: %s'), err.message);
})