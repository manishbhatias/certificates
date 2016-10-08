var fs = require('fs');
var gm = require('gm');
var defaults = {
    'template': '',
    'font': {
        'color': '#000',
        'face': 'opensans',
        'size': '40'
    },
    'mergeVars': []
};

function generateCertificate (opts) {

    var options = Object.assign({}, defaults, opts);

    if (!options.template || fs.existsSync(options.template) === false) {
        throw Error('Please specify a proper certificate template!' + options.template);
    }

    return function (out, mergeData, callback) {
        var img = gm(options.template).noProfile();
        if (options.font) {
            img = img.font(options.font.face, options.font.size).stroke(options.font.color);
        }
        if (Array.isArray(options.mergeVars)) {
            options.mergeVars.forEach(function (v) {
                if (mergeData[v.key]) {
                    img.region(v.box.width, v.box.height, v.box.left, v.box.top).drawText(0, 0, mergeData[v.key], 'center');
                }
            });
        }
        //Resize to A4 72 DPI and write to output file
        img.write(out, function(){
          gm(out).resize(842, 595).write(out, callback);
        })
    }

}

module.exports = generateCertificate;