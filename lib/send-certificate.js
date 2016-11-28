function sendCertificate (opts) {
    const generateCertificate = require('./generate-certificate')(opts.certificate);
    const sendEmail = require('./send-email')(opts.email);

    return function (recipient, cb) {
        console.log('Processing recipient %s', recipient.email);
        generateCertificate(recipient).then(sendEmail).then(function (result) {
            cb(null, result);
        }).catch(function (err) {
            cb(err);
        });
    }
}

module.exports = sendCertificate;