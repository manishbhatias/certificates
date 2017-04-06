#!/usr/bin/env node

const fs = require('fs');
const path = require("path");
const config = require('../config');
const objectPath = require('object-path');
const chalk = require('chalk');
const inquirer = require('inquirer');

const Handlebars = require('handlebars');

// Email configuration
// TODO certificate configuration
var requiredConfig = [
    {
        type: 'input',
        name: 'email.aws.accessKeyId',
        message: 'AWS Access Key',
        default: config.email.aws.accessKeyId,
        when: true
    },
    {
        type: 'password',
        name: 'email.aws.secretAccessKey',
        message: 'AWS Secret Access Key',
        default: config.email.aws.secretAccessKey,
        when: true
    },
    {
        type: 'list',
        name: 'email.aws.region',
        message: 'AWS Region',
        default: config.email.aws.region,
        choices: [
            {name: 'US East (N. Virginia)', value: 'us-east-1'},
            {name: 'US West (Oregon)', value: 'us-west-2'},
            {name: 'EU (Ireland)', value: 'eu-west-1'}
        ],
        when: true
    }, {
        type: 'input',
        name: 'email.from.name',
        message: 'Email From Name',
        default: config.email.from.name,
        filter: function (val) {
            return String.prototype.trim.call(val);
        },
        when: true
    }, {
        type: 'input',
        name: 'email.from.email',
        message: 'Email From Email',
        default: config.email.from.email,
        validate: function (email) {
            const EMAIL_REGEX = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
            if (typeof email === 'string' && email.length > 5 && email.length < 61 && EMAIL_REGEX.test(email)) {
                return true;
            } else {
                return 'Please enter a valid email address';
            }
        },
        filter: function (val) {
            return String.prototype.toLowerCase.call(val);
        },
        when: true
    },
    {
        type: 'input',
        name: 'email.bcc',
        message: 'Email BCC',
        default: "",
        validate: function (email) {
            const EMAIL_REGEX = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
            if (email.length === 0 || (typeof email === 'string' && email.length > 5 && email.length < 61 && EMAIL_REGEX.test(email))) {
                return true;
            } else {
                return 'Please enter a valid email address';
            }
        },
        filter: function (val) {
            return String.prototype.toLowerCase.call(val);
        },
        when: true
    },
    {
        type: 'input',
        name: 'email.subject',
        message: 'Email Subject',
        default: config.email.subject,
        when: true
    },
    {
        type: 'editor',
        name: 'email.body',
        message: 'Email Body',
        default: config.email.body,
        validate: function (body) {
            try {
                body = Handlebars.compile(body);
                return true;
            } catch (e) {
                return e.message;
            }
        },
        when: true
    },
    {
        type: 'list',
        name: 'certificate.font.face',
        message: 'Font Face',
        default: config.certificate.font.face,
        choices: function (answers) {
            let done = this.async();
            let fonts = [];
            let dir = path.resolve(__dirname + '/../assets/');
            fs.readdir(dir, function (err, files) {
                if (err)
                    return done(err, fonts);
                fonts = files.map(function (file) {
                    return path.join(dir, file);
                }).filter(function (file) {
                    return path.extname(file) === '.ttf';
                }).map(function (file) {
                    return {
                        name: path.basename(file, '.ttf'),
                        value: file
                    };
                });
                done(null, fonts);
            });
        },
        when: true
    },
    {
        type: 'input',
        name: 'certificate.font.size',
        message: 'Font Size',
        default: config.certificate.font.size,
        when: true
    },
    {
        type: 'input',
        name: 'certificate.font.color',
        message: 'Font Color (Hex)',
        default: config.certificate.font.color,
        validate: function (color) {
            return /^#[0-9A-F]{6}$/i.test(color) === true;
        },
        when: true
    }
];

inquirer.prompt(requiredConfig).then(function (answers) {
    Object.keys(answers).forEach(function (k) {
        objectPath.set(config, k, answers[k]);
    });
    console.log('Saved Configuration');
});