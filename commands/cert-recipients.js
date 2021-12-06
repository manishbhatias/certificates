#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const config = require('../config');

const chalk = require('chalk');
const program = require('commander');
const Table = require('cli-table3');

const db = require('../lib/db')(config.db);
const client = require('level-jobs/client')(db);

program
    .command('list', null, {isDefault: true})
    .description('Show the current list of recipients')
    .option('-l, --limit <limit>', 'Limit the number of rows', 10)
    .action(function (cmd) {
        let limit = parseInt(cmd.limit, 10) || 10;
        let table = new Table();
        let stream = client._work.createReadStream({
            keys: false,
            values: true,
            limit: limit
        });
        let i = 0;
        stream.on('data', function (d) {
            let value = JSON.parse(d);
            if (i == 0) {
                table.options.head = Object.keys(value);
            }
            let values = table.options.head.map(function (key) {
                return value[key];
            });
            table.push(values);
            i++;
        });
        stream.on('end', function () {
            console.log(table.toString());
        });
    });
program
    .command('add <csv-file>')
    .description('Add recipients from a CSV file')
    .action(function (file, cmd) {
        file = path.resolve(file);
        if (!fs.existsSync(file)) {
            console.log(chalk.red('Please provide a valid csv file!'))
        }
        let count = 0;
        let csvparser = require('csv-parse')({
            columns: function (headers) {
                return headers.map(function (h) {
                    return h.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/[-\s]+/g, '-');
                });
            },
            skip_empty_lines: false,
            trim: true,
            auto_parse: true
        });

        csvparser.on('readable', function () {
            while (record = csvparser.read()) {
                if (record.email && record.name) {
                    client.push(record);
                    count++;
                } else {
                    console.log('Name & Email are required!');
                }
            }
        });
        // Catch any error
        csvparser.on('error', function (err) {
            console.log(err.message);
        });

        csvparser.on('end', function () {
            console.log('%s records processed', count);
        });
        let input = fs.createReadStream(file);
        input.pipe(csvparser);
    });
program
    .command('reset')
    .description('Reset the current list of recipients')
    .action(function (cmd, args) {
        let stream = client._work.createReadStream({
            keys: true,
            values: false
        });
        let count = 0;
        stream.on('data', function (d) {
            client.del(d);
            count++;
        });
        stream.on('end', function () {
            console.log('Reset complete. %s records deleted!', count);
        });
    });

program.parse(process.argv);