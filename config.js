const Preferences = require("preferences");

const config = new Preferences('org.manishbhatias.certificates', {
    'db': 'db',
    'certificate': {
        'template': __dirname + '/assets/certificate.jpg',
        'font': {
            'face': __dirname + '/assets/lucida_calligraphy_italic.ttf',
            'color': '#927c57',
            'size': '36'
        },
        'mergeVars': [
            {
                'key': 'name',
                'box': {
                    left: 170, top: 400, width: 505, height: 40
                }
            },
            {
                'key': 'bib',
                'box': {
                    left: 770, top: 400, width: 120, height: 40
                }
            },
            {
                'key': 'run',
                'box': {
                    left: 640, top: 460, width: 100, height: 40
                }
            },
            {
                'key': 'time',
                'box': {
                    left: 350, top: 520, width: 310, height: 40
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
        'body': '',
        'aws': {
            'region': '',
            'accessKeyId': '',
            'secretAccessKey': ''
        }
    }
});

module.exports = config;