# JBJ IST module

[![Travis-CI](https://img.shields.io/travis/Inist-CNRS/node-jbj-ist.svg "Travis-CI")](https://travis-ci.org/Inist-CNRS/node-jbj-ist)
[![Code Coverage](https://img.shields.io/codecov/c/github/Inist-CNRS/node-jbj-ist.svg "Code Coverage")](https://codecov.io/github/Inist-CNRS/node-jbj-ist)

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

> **Warning**: `issn2ppn`, `ean2ppn`, and `isbn2ppn` work only with node
> version 4+.

<a id="isbn2ppn"></a>
### isbn2ppn: isbn | [isbn1,isbn2,...]

Return PPN for the given ISBN (one or several, via an array).

```javascript
  var stylesheet = {
    "set": "978-3-16-148410-0",
    "isbn2ppn": true
  };
  // output:
  // "114442231"
```

Or, with an array:

```javascript
   var stylesheet = {
       "set": ["978-3-16-148410-0", "2729112367"]
       "isbn2ppn": true
   };
   // output:
   // [ "114442231", "045205264" ]
```

> **Warning**: `issn2ppn`, `ean2ppn`, and `isbn2ppn` work only with node
> version 4+.

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

> **Warning**: `issn2ppn`, `ean2ppn`, and `isbn2ppn` work only with node
> version 4+.

<a id="resolvePII"></a>
### resolvePII: pii

Return metadata from a PII (Publisher Item Identifier), using Elsevier's API.

```javascript
   var stylesheet = {
       "set": "10.1134/S1607672911010121",
       "resolvePII": true
   };
   // output:
   //   {
   //      "els-publication-title": "Developmental Cell",
   //      "els-article-title": "A CRISPR/Cas9 Vector System for Tissue-Specific Gene Disruption in Zebrafish ",
   //      "els-doi": "10.1016/j.devcel.2015.01.032",
   //      "els-pii": "S1534-5807(15)00075-1",
   //      "els-type": "Journal",
   //      "els-ISSN": "15345807",
   //      "els-ISBN": "",
   //      "els-publication-date": "2015-03-23",
   //      "els-publication-date-year": "2015",
   //      "els-meta": {
   //        "prism:url": "http://api.elsevier.com/content/article/pii/S1534580715000751",
   //        "dc:identifier": "doi:10.1016/j.devcel.2015.01.032",
   //        "eid": "1-s2.0-S1534580715000751",
   //        "prism:doi": "10.1016/j.devcel.2015.01.032",
   //        "pii": "S1534-5807(15)00075-1",
   //        "dc:title": "A CRISPR/Cas9 Vector System for Tissue-Specific Gene Disruption in Zebrafish ",
   //        "prism:publicationName": "Developmental Cell",
   //        "prism:aggregationType": "Journal",
   //        "prism:issn": "15345807",
   //        "prism:coverDate": "2015-03-23",
   //        "prism:coverDisplayDate": "23 March 2015",
   //        "openaccess": "0",
   //        "openaccessArticle": false,
   //        "openaccessType": null,
   //        "openArchiveArticle": false,
   //        "openaccessSponsorName": null,
   //        "openaccessSponsorType": null,
   //        "openaccessUserLicense": null,
   //        "link": [{
   //          "@_fa": "true",
   //          "@href": "http://api.elsevier.com/content/article/pii/S1534580715000751",
   //          "@rel": "self"
   //        }, {
   //          "@_fa": "true",
   //          "@href": "http://www.sciencedirect.com/science/article/pii/S1534580715000751",
   //          "@rel": "scidir"
   //        }]
   //      }
   //    }
```


<a id="resolveHAL"></a>
### resolveHAL: docid

Return metadata from a HAL identifier.

```javascript
   var stylesheet = {
       "set": "19",
       "resolveHAL": true
   };
   // output:
   // {
   //   "docid": 19,
   //   "uri_s": "https://hal.archives-ouvertes.fr/hal-00000019",
   //   "label_s": "Mark Wexler, Francesco Panerai, Ivan Lamouret, Jacques 
   //   Droulez. Self-motion and the perception of stationary objects. Nature, 
   //   Nature Publishing Group, 2001, 409, pp.85-88. &lt;hal-00000019&gt;"
   // }
```


## Examples

See unit tests : https://github.com/Inist-CNRS/node-jbj-ist/tree/master/test


## Try it

http://Inist-CNRS.github.io/node-jbj/

(don't forget to click on IST button -- when it will exist)

## License

[MIT](https://github.com/Inist-CNRS/node-jbj-ist/blob/master/LICENSE)
