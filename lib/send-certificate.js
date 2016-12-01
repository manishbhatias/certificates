function sendCertificate (options) {
    const generateCertificate = require('./generate-certificate')(options.certificate);
    const sendEmail = require('./send-email')(options.email);

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