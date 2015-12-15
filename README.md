# JBJ IST module

IST module of JBJ: bibliographic metadata handling.

## Contributors

  * [François Parmentier](https://github.com/parmentf)

## Installation

```bash
$ npm install jbj-ist
```

## Usage

This JBJ module cannot be used alone. JBJ has to be installed.

```js
var JBJ = require('jbj');
JBJ.use(require('jbj-ist'));
```

## Tests

Use [mocha](https://github.com/visionmedia/mocha) to run the tests.

```bash
$ npm install
$ npm test
```

## Actions

Once the module is declared as used for JBJ, you can use the following actions:

<a id="resolveDOI"></a>
### resolveDOI: doi | [doi1,doi2,...]

Return metadata from a DOI (Document Object Identifier), or from an array of
DOIs (using CrossRef).

```javascript
   var stylesheet = {
       "set": "10.1134/S1607672911010121",
       "resolveDOI": true
   };
   // output:
   // { "doi-publication-title": 
   //   [ "Dokl Biochem Biophys",
   //     "Doklady Biochemistry and Biophysics" ],
   //     "doi-publication-date-year": 2011,
   //     "doi-publisher": "Pleiades Publishing Ltd",
   //     "doi-type": "journal-article",
   //     "doi-ISSN": [ "1607-6729", "1608-3091" ],
   //     "doi-subject": [ "Chemistry(all)", "Biochemistry", "Biophysics" ],
   //     "doi-DOI": "10.1134/s1607672911010121" }
```

Or, with an array:

```javascript
   var stylesheet = {
       "set": ["10.1134/S1607672911010121", "10.1007/BF02478894"]
       "resolveDOI": true
   };
   // output:
   // { 'doi-publication-title': 
   //   [ "Dokl Biochem Biophys",
   //     "Doklady Biochemistry and Biophysics" ],
   //     "doi-publication-date-year": 2011,
   //     "doi-publisher": "Pleiades Publishing Ltd",
   //     "doi-type": "journal-article",
   //     "doi-ISSN": [ "1607-6729", "1608-3091" ],
   //     "doi-subject": [ "Chemistry(all)", "Biochemistry", "Biophysics" ],
   //     "doi-DOI": "10.1134/s1607672911010121" }
```


<a id="issn2ppn"></a>
### issn2ppn: issn | [issn1,issn2,...]

Return PPN for the given ISSN (one or several, via an array).

```javascript
  var stylesheet = {
    "set": "0182-2012",
    "issn2ppn": true
  };
  // output:
  // "001014692"
```

Or, with an array:

```javascript
   var stylesheet = {
       "set": ["0182-2012", "0774-3122"]
       "issn2ppn": true
   };
   // output:
   // [ "001014692", "000928151" ]
```

<a id="ean2ppn"></a>
### ean2ppn: ean | [ean1,ean2,...]

Return PPN for the given EAN (one or several, via an array).

```javascript
  var stylesheet = {
    "set": "5901234123457",
    "ean2ppn": true
  };
  // output:
  // "189158077"
```

Or, with an array:

```javascript
   var stylesheet = {
       "set": ["5901234123457", "9782729602956"]
       "ean2ppn": true
   };
   // output:
   // [ "189158077", [ "001496433", "007162766" ] ]
```



## Examples

See unit tests : https://github.com/Inist-CNRS/node-jbj-ist/tree/master/test


## Try it

http://Inist-CNRS.github.io/node-jbj/

(don't forget to click on IST button -- when it will exist)

## License

[MIT](https://github.com/Inist-CNRS/node-jbj-ist/blob/master/LICENSE)
