const fs = require('fs')
const path = require('path')
const SwaggerParser = require('swagger-parser')
const ejs = require('ejs')
const erb = require('erb')
const _ = require('lodash')

const defaultOptions = {
  template: null,
  input: null,
  output: path.resolve('dist'),
  outputExt: null,
}

module.exports = {

  generate (args) {

    var options = _.merge(defaultOptions, {
      template: path.resolve(args.flags.template),
      input: path.resolve(args.flags.input),
      output: args.flags.output ? path.resolve(args.flags.output) : defaultOptions.output,
      outputExt: args.flags.language,
    })

    SwaggerParser.validate(options.input)
      .then(function(api) {
        api2Files(api, options)
      })
      .catch(function(err) {
        console.error(err)
      })
  }
}

function api2Files (api, options) {
  try {
    var templateFiles = _.filter(fs.readdirSync(options.template), (filepath) => {
      return ((path.extname(filepath) === '.ejs') || (path.extname(filepath) === '.erb'))
    })

    if (!fs.existsSync(options.output)) {
      fs.mkdirSync(options.output)
    }

    templateFiles.forEach((templateFile) => {
      templateFile = path.join(options.template, templateFile)

      var templateExt = path.extname(templateFile)

      var templateDir = path.join(options.output, path.basename(templateFile, templateExt))

      if (!fs.existsSync(templateDir)) {
        fs.mkdirSync(templateDir)
      }

      var templateString = fs.readFileSync(templateFile, { encoding: 'utf8' })

      _.forEach(api.paths, (api, apiKey) => {

        apiKey = apiKey.replace(/^\//, '').replace(/\//g, '_').replace(/\_\{(.*)\}/, '_#$1')

        _.forEach(api, (apiData, methodName) => {
          console.log(`create: ${methodName}`, apiKey)

          var outputFile = path.join(templateDir, methodName + apiKey + options.outputExt)

          var templateData = _.merge(apiData, { path: apiKey, method: methodName, _: _ })

          renderFile(templateString, templateData, templateExt, outputFile)
        })
      })
    })

  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

function renderFile (templateString, templateData, type, outputFile) {

  if (type === '.ejs') {
    fs.writeFileSync(outputFile, ejs.render(templateString, templateData), {}, 'utf8')
  } else {
    erb({ data: templateData, template: templateString })
      .then((data) => {
        fs.writeFileSync(outputFile, data, {}, 'utf8')
      })
      .catch((err) => {
        console.error(e)
        process.exit(1)
      })
  }
}
