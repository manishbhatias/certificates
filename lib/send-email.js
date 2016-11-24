const fs = require('fs');
const AWS = require('aws-sdk');
const defaults = {
    'from': '',
    'subject': '',
    'body': '',
    'aws': {
        'accessKeyId': '',
        'secretAccessKey': '',
        'region': 'us-east-1',
        'rateLimit': 1,
        'maxConnections': 10
    }
};

const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');

function sendEmail (opts) {

    const options = Object.assign({}, defaults, opts);

    if (!options.from) {
        throw Error('Please specify a proper from email address!');
    }

    if (!options.subject) {
        throw Error('Please specify a proper email subject!');
    }

    if (!options.body || fs.existsSync(options.body) === false) {
        throw Error('Please specify a proper email body!');
    } else {
        options.bodyContent = fs.readFileSync(options.body);
    }

    AWS.config.update({
        accessKeyId: options.aws.accessKeyId,
        secretAccessKey: options.aws.secretAccessKey,
        region: options.aws.region,
        maxRetries: 1
    });

    const SES = new AWS.SES();
    /*
     // todo Check if from email address is verified, if not, initiate verification and exit with error
     SES.getIdentityVerificationAttributes({
     Identities: [
     options.from
     ]
     }, function (err, data) {
     if (err) {
     throw Error('Unable to check if from email address is verified! : ' + err.message);
     }

     if(data.VerificationAttributes)
     console.log(data);
     });
     // todo Check Last Send in 24h < Max Send in 24h and configure rateLimit
     */
    const transporter = nodemailer.createTransport(sesTransport({
        ses: SES,
        rateLimit: options.aws.rateLimit,
        maxConnections: options.aws.maxConnections
    }));

    return function (recipient) {
        return new Promise(function (resolve, reject) {
            let emailData = {
                'from': options.from,
                'to': recipient.email,
                'subject': options.subject,
                'text': options.bodyContent,
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