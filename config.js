const config = {
    'certificate': {
        'template': './assets/certificate.jpg',
        'font': {
            'color': '#000',
            'face': './assets/Pacifico.ttf',
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
    'aws': {
        'accessKey': '',
        'accessSecret': '',
        'region': ''
    }
};

module.exports = config;