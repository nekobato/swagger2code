# swagger2code

Generate templates in a different way from swagger-codegen

## Usage

```
$ swagger2code -i [swagger file] -t [template dir] -o [output dir]

Options:
  --input, -i     Swagger file (.json or .yaml)
  --template, -t  Template Directory
  --output, -o    Output Directory (Default: ./dist)
  --language, -l  Set output's Extension (.js, .rb, .cs, ...)
  --config, -c    Set config file (overwrite other options)
```
