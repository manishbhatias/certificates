const config = {
    'db': 'db',
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
    'email': {
        'from': '"Team Bhumi" <contact@bhumi.ngo>',
        'subject': 'Test Subject',
        'body': './assets/email.txt',
        'aws': {
            'region': 'us-east-1',
            'accessKeyId': 'AKIAIJZHLX6NQFBCN25A',
            'secretAccessKey': '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'
        }
    }
};

module.exports = config;