const util = require('util');
const fs = require('fs');

const Handlebars = require('handlebars');
const AWS = require('aws-sdk');

const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');

function sendEmail (options) {
    let bodyContent;
    if (!options.from.email) {
        throw Error('Please specify a proper from email address!');
    }

    if (!options.subject) {
        throw Error('Please specify a proper email subject!');
    }

    if (!options.body) {
        throw Error('Please specify a proper email body!');
    } else {
        try {
            bodyContent = Handlebars.compile(options.body);
        } catch (e) {
            throw Error('There was an issue reading the email body. Please check for errors! : ' + e.message);
        }

    }

    AWS.config.update({
        accessKeyId: options.aws.accessKeyId,
        secretAccessKey: options.aws.secretAccessKey,
        region: options.aws.region,
        maxRetries: 1
    });

    const SES = new AWS.SES();

    /* TODO Move to opts
     // Check if from email address is verified, if not, initiate verification and exit with error
     SES.getIdentityVerificationAttributes({
     Identities: [
     options.from.email,
     options.from.email.split('@')[1]
     ]
     },
     function (err, data) {
     if (err) {
     throw Error('Unable to check if from email address is verified! : ' + err.message);
     }
     let emailVerified = false;
     if (data.VerificationAttributes) {
     Object.keys(data.VerificationAttributes).forEach(function (v) {
     if (data.VerificationAttributes[v].VerificationStatus === 'Success') {
     emailVerified = true;
     }
     });
     }
     if (!emailVerified) {
     throw Error('Please verify your from email address in AWS SES console!');
     }
     }
     );

     // Check Last Send in 24h < Max Send in 24h and configure rateLimit
     SES.getSendQuota(function (err, data) {
     if (err) {
     throw Error('Unable to check your AWS sending limits! : ' + err.message);
     }
     console.log('Sending upto %s messages per second ', data.MaxSendRate);
     if (data.Max24HourSend > 0 && (data.SentLast24Hours >= data.Max24HourSend)) {
     throw Error('You have reached the maximum daily send quota. Please wait for some time!');
     }
     });
     */

    const transporter = nodemailer.createTransport(sesTransport({
        ses: SES
    }));

    return function (recipient) {
        return new Promise(function (resolve, reject) {
            let emailData = {
                'from': util.format('"%s" <%s>', options.from.name, options.from.email),
                'to': recipient.email,
                'subject': options.subject,
                'text': bodyContent(recipient),
                'attachments': [
                    {
                        'filename': recipient.certificate.name,
                        'content': recipient.certificate.content
                    }
                ]
            };
            transporter.sendMail(emailData, function (err, data) {
                if (err) {
                    return reject(err)
                }
                recipient.messageId = data.messageId;
                resolve(recipient);
            });
        });
    }
}

module.exports = sendEmail;