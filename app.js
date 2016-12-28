/**
 * Created by anurag.negi on 12/26/16.
 */
/getting all urls/

var request = require ('request');
var cheerio = require('cheerio');
var fs = require('fs');
url = 'https://en.wikipedia.org/wiki/Main_Page';
var url_arr = [];
    request(url, function (err, response, html) {
        if (!err) {
            var $ = cheerio.load(html);
            $('a').each(function (i, element) {
                var name = $(this).attr('href');
                name_str = JSON.stringify(name);
                if (typeof name_str === 'undefined') {
                    return true;
                }
                if (name.indexOf("Portal") > -1) {
                    url_arr.push('https://en.wikipedia.org' + name);
                }

            });
            url_arr.forEach(function (i) {
                url2 = i
                request(url2, function (err,response,html) {
                    var $ = cheerio.load(html)
                    $('a').each(function (j,element2) {
                        var name2 = $(this).text();
                        fs.appendFile('info.txt',name2)
                    })
                })
            })
        };
    });