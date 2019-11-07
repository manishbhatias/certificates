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
                    left: 1830, top: 1500, width: 1300, height: 110
                }
            }
        ]
    },
    'email': {
        'type': 'text',
        'from': {
            'name': '',
            'email': ''
        },
        'bcc': '',
        'subject': '',
        'body': ``,
        'transport': 'aws',
        'aws': {
            'region': 'us-west-2',
            'accessKeyId': '',
            'secretAccessKey': ''
        },
        'postmark': {
            'apiKey': ''
        }
    }
};

module.exports = new Preferences('org.certificates', defaultConfig, {
    encrypt: false,
    format: 'json'
});