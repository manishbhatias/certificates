#!/usr/bin/env node

const chalk = require('chalk');
const figlet = require('figlet');
const program = require('commander');
const packageData = require('../package.json');

console.log(
    chalk.yellow(
        figlet.textSync('Certificates', {horizontalLayout: 'full'})
    )
);

program.on('--help', function () {
    console.log(chalk.bold('  Instructions:'))
    console.log('');
    console.log(chalk.reset('    - First, configure the program'));
    console.log('      $ cert opts');
    console.log(chalk.reset('    - Second, add the list of recipients'));
    console.log('      $ cert recipients add <csv-file>');
    console.log(chalk.reset('    - Finally, send the personalized certificates to all recipients'));
    console.log('      $ cert send');
    console.log('');
});

program
    .version(packageData.version)
    .description('Send personalized certificates in bulk')
    .command('opts', 'Change certificate generation and mailing options interactively')
    .command('recipients', 'Manage recipients to send certificates to')
    .command('send', 'Send certificates')
    .parse(process.argv);

if (!program.args.length) program.help();

