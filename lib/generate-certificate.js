const fs = require('fs');
const gm = require('gm');
const defaults = {
    'template': '',
    'font': {
        'color': '#000',
        'face': 'opensans',
        'size': '40'
    },
    'mergeVars': []
};

function generateCertificate (opts) {

    let options = Object.assign({}, defaults, opts);
    if (!options.template || fs.existsSync(options.template) === false) {
        throw Error('Please specify a proper certificate template!' + options.template);
    }

    return function (recipient) {
        return new Promise(function (resolve, reject) {
            let img = gm(options.template).noProfile();

            if (options.font) {
                img = img.font(options.font.face, options.font.size).stroke(options.font.color);
            }

            if (Array.isArray(options.mergeVars)) {
                options.mergeVars.forEach(function (v) {
                    if (recipient[v.key]) {
                        img.region(v.box.width, v.box.height, v.box.left, v.box.top).drawText(0, 0, recipient[v.key], 'center');
                    }
                });
            }

            // Resize to A4 72 DPI and write to output buffer. Workaround for region issues
            img.toBuffer('PNG', function (err, out) {
                if (err) {
                    return reject(err);
                }
                gm(out).resize(842, 595).toBuffer('PDF', function (err, buffer) {
                    if (err) {
                        reject(err);
                    }
                    recipient.certificate = {
                        name: recipient.name + '-Certificate.pdf',
                        content: buffer
                    };
                    resolve(recipient);
                });
            });
        });
    }
}

module.exports = generateCertificate;