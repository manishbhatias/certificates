# certificates [![NPM Version](https://img.shields.io/npm/v/certificates.svg?style=flat)](https://www.npmjs.org/package/certificates)

Create and send personalized e-certificates in bulk using Graphicsmagick and AWS

## External Dependencies

1. GraphicsMagick

## Installation

First download and install [GraphicsMagick](http://www.graphicsmagick.org/). In Mac OS X, you can simply use [Homebrew](http://mxcl.github.io/homebrew/) and do:

    brew install graphicsmagick

then use npm:

    npm install certificates -g

## Basic Usage

- First, configure the program
```
    $ cert opts
```
- Second, add the list of recipients
```
    $ cert recipients add <csv-file>
```
- Finally, send the personalized certificates to all recipients
```
    $ cert send
```

## Todo

The goal is to have a program which can be installed easily and has a web based GUI, where anyone can 

- select an email provider (Gmail, AWS, Mandrill etc..)
- upload the certificate image, mark some areas to customize, add fields
- import a CSV file with the field values and let the program generate and send personalized certificates

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

See [LICENSE.md](LICENSE.md)
