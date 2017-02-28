const Preferences = require("preferences");

const config = new Preferences('com.manishbhatias.certificates', {
    'db': 'db',
    'certificate': {
        'template': __dirname + '/assets/certificate.jpg',
        'font': {
            'color': '#000',
            'face': __dirname + '/assets/Pacifico.ttf',
            'color': '#000000',
            'size': '80'
        },
        'mergeVars': [
            {
                'key': 'name',
                'box': {
                    left: 880, top: 716, width: 1460, height: 120
                }
            },
            {
                'key': 'event',
                'box': {
                    left: 560, top: 830, width: 2328, height: 120
                },
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
        'body': '',
        'aws': {
            'region': '',
            'accessKeyId': '',
            'secretAccessKey': ''
        }
    }
});

module.exports = config;