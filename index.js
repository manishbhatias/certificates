const config = require('./config');
const generateCertificate = require('./generate-certificate')(config.certificate);

generateCertificate('certificate.pdf', {'name': 'Manish', 'event': 'Daan Utsav 2016'}, function () {
    console.log('done')
});