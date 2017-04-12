#!/usr/bin/env node

const os = require('os');
const chalk = require('chalk');
const config = require('../config');
const sendCertificate = require('../lib/send-certificate')(config);

const db = require('../lib/db')(config.db);
const queue = require('level-jobs')(db, sendCertificate, {
    maxConcurrency: os.cpus().length,
    maxRetries: 1
});

queue.on('error', function (err) {
    console.log(chalk.red('Error: %s'), err.message);
})

queue.on('retry', function (err) {
    console.log(chalk.yellow('Retrying: %s'), err.message);
})

queue.on('drain', function () {
    console.log(chalk.yellow('All recipients have been queued for processing!'));
})