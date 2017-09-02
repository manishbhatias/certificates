const Preferences = require("preferences");

const defaultConfig = {
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
                    left: 174, top: 412, width: 495, height: 40
                }
            },
            {
                'key': 'bib',
                'box': {
                    left: 775, top: 412, width: 110, height: 40
                }
            },
            {
                'key': 'run',
                'box': {
                    left: 642, top: 470, width: 90, height: 40
                }
            },
            {
                'key': 'time',
                'box': {
                    left: 310, top: 530, width: 280, height: 40
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
};

module.exports = new Preferences('com.manishbhatias.certificates', defaultConfig);