const fs = require('fs');
const gm = require('gm');

function generateCertificate(options) {

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
                gm(out).resize(842, 595).density(72, 72).units('PixelsPerInch').toBuffer('PDF', function (err, buffer) {
                    if (err) {
                        reject(err);
                    }
                    (recipient.attachments = recipient.attachments || []).push({
                        filename: recipient.name + '-PNG.pdf',
                        content: buffer
                    });
                    gm(out).resize(842, 595).density(72, 72).units('PixelsPerInch').toBuffer('JPEG', function (err, buffer) {
                        if (err) {
                            reject(err);
                        }
                        (recipient.attachments = recipient.attachments || []).push({
                            filename: recipient.name + '-JPG.jpg',
                            content: buffer
                        });
                        resolve(recipient);
                    });
                });
            });
        });
    }
}

module.exports = generateCertificate;