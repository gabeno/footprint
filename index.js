var sqlite = require('sqlite3');
var path = require('path');

//var filePath = '/home/gabriel/.config/chromium/Default/Archived\ History';
var filePath = '/home/gabriel/.config/chromium/Default/History';
var filename = path.basename(filePath);
var dir = path.dirname(filePath);

process.chdir(dir);

var db = new sqlite.Database(filename, 'OPEN_READONLY', function(err) {
  if (err) console.log(err);
  console.log('Database opened successfully.');
});

/**

https://developer.chrome.com/extensions/history

sqlite> .schema
CREATE TABLE keyword_search_terms (keyword_id INTEGER NOT NULL,url_id INTEGER NOT NULL,
                                   lower_term LONGVARCHAR NOT NULL,term LONGVARCHAR NOT NULL);
CREATE TABLE meta(key LONGVARCHAR NOT NULL UNIQUE PRIMARY KEY, value LONGVARCHAR);
CREATE TABLE urls(id INTEGER PRIMARY KEY,url LONGVARCHAR,title LONGVARCHAR,
                  visit_count INTEGER DEFAULT 0 NOT NULL,typed_count INTEGER DEFAULT 0 NOT NULL,
                  last_visit_time INTEGER NOT NULL,hidden INTEGER DEFAULT 0 NOT NULL,
                  favicon_id INTEGER DEFAULT 0 NOT NULL);
CREATE TABLE visit_source(id INTEGER PRIMARY KEY,source INTEGER NOT NULL);
CREATE TABLE visits(id INTEGER PRIMARY KEY,url INTEGER NOT NULL,visit_time INTEGER NOT NULL,
                    from_visit INTEGER,transition INTEGER DEFAULT 0 NOT NULL,segment_id INTEGER,
                    is_indexed BOOLEAN,visit_duration INTEGER DEFAULT 0 NOT NULL);
CREATE INDEX keyword_search_terms_index1 ON keyword_search_terms (keyword_id, lower_term);
CREATE INDEX keyword_search_terms_index2 ON keyword_search_terms (url_id);
CREATE INDEX keyword_search_terms_index3 ON keyword_search_terms (term);
CREATE INDEX urls_url_index ON urls (url);
CREATE INDEX visits_from_index ON visits (from_visit);
CREATE INDEX visits_time_index ON visits (visit_time);
CREATE INDEX visits_url_index ON visits (url);

 */

db.each('SELECT * FROM urls', function(err, row) {
  console.log(row);
}, function(err, numrow) {
  console.log('%d rows retrieved', numrow);
});

// db.all('SELECT * FROM urls', function(err, rows) {
//   console.log(rows);
// });

db.close(function(err) {
  if (err) console.log(err);
  console.log('Database closed successfully.')
});
