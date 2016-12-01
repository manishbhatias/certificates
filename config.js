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
                    left: 892, top: 688, width: 1440, height: 120
                }
            },
            {
                'key': 'event',
                'box': {
                    left: 600, top: 830, width: 2275, height: 120
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