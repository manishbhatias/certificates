const Preferences = require("preferences");

const defaultConfig = {
    'db': 'db',
    'certificate': {
        'template': __dirname + '/assets/certificate.jpg',
        'font': {
            'face': __dirname + '/assets/lucida_calligraphy_italic.ttf',
            'color': '#927c57',
            'size': '90'
        },
        'mergeVars': [
            {
                'key': 'name',
                'box': {
                    left: 1790, top: 875, width: 1570, height: 120
                }
            },
            {
                'key': 'activity',
                'box': {
                    left: 2030, top: 1080, width: 1320, height: 120
                }
            }
        ]
    },
    'email': {
        'from': {
            'name': '',
            'email': ''
        },
        'bcc': '',
        'subject': '',
        'body': `Dear {{name}},

Thank you for being a part of Bhumi's activities this year.

Please find attached your certificate, as a token of our recognition.

In alignment with Bhumi's values of being eco-conscious (http://www.bhumi.ngo/about/), we are sending you an e-copy of the certificate. We request you to print the same only if essential. It is recommended that A4 size paper of 250/300 GSM thickness is used for printing.

To volunteer regularly with Bhumi it is essential to register at http://www.bhumi.ngo/volunteer and attend an orientation programme (if you already haven't).

We look forward to you changing today with you!

Niveditha
Bhumi Team`,
        'aws': {
            'region': 'us-west-2',
            'accessKeyId': '',
            'secretAccessKey': ''
        }
    }
};

module.exports = new Preferences('org.bhumi.certificates', defaultConfig);