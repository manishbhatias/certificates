const util = require('util');

const Handlebars = require('handlebars');
const AWS = require('aws-sdk');

const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const postmarkTransport = require('nodemailer-postmark-transport');

function sendEmail(options) {
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

    let transporter;
    if (options.transport === 'aws') {
        AWS.config.update({
            accessKeyId: options.aws.accessKeyId,
            secretAccessKey: options.aws.secretAccessKey,
            region: options.aws.region,
            maxRetries: 1
        });

        const SES = new AWS.SES();
        transporter = nodemailer.createTransport(sesTransport({
            ses: SES
        }));
    } else if (options.transport === 'postmark') {
        transporter = nodemailer.createTransport(postmarkTransport({
            auth: {
                apiKey: options.postmark.apiKey
            }
        }));
    } else {
        throw Error('There was an issue initializing the email transport. Please check configuration!');
    }


    /* TODO Move to opts

    AWS.config.update({
        accessKeyId: options.aws.accessKeyId,
        secretAccessKey: options.aws.secretAccessKey,
        region: options.aws.region,
        maxRetries: 1
    });

    const SES = new AWS.SES();
    const transporter = nodemailer.createTransport(sesTransport({
        ses: SES
    }));


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

    return function (recipient) {
        return new Promise(function (resolve, reject) {
            let emailData = {
                'from': util.format('"%s" <%s>', options.from.name, options.from.email),
                'to': recipient.email,
                'subject': options.subject,
                'attachments': recipient.attachments
            };

            if (options.type === 'html') {
                emailData.html = bodyContent(recipient);
            } else {
                emailData.text = bodyContent(recipient);
            }

            if (options.bcc) {
                emailData.bcc = options.bcc;
            }

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