'use strict'
const meow = require('meow')

const usageText = `
	Usage
	  $ swagger2code -i [swagger file] -t [template dir] -o [output dir]

	Options
	  --input, -i     Swagger file (.json or .yaml)
	  --template, -t  Template Directory
	  --output, -o    Output Directory (Default: ./dist)
    --language, -l  Set output's Extension (.js, .rb, .cs, ...)
    --config, -c    Set config file (overwrite other options)
`

module.exports = meow(usageText, {
	alias: {
		i: 'input',
		t: 'template',
		o: 'output',
    l: 'language',
    c: 'config',
	},
  help: usageText,
})
