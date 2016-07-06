"use strict";
var fs = require('fs')

var request = require('request');
let cheerio = require('cheerio');
let stringify = require('csv-stringify')

let site_url = "http://substack.net/images/"
function writeTocsvFile (path, data){
  stringify(data, function(error, output){
    fs.writeFile(path, output, function(err){
      if (err){
        console.log(err);
      }
      else {
        console.log('File has been written to', path);
      }
    })
  })
}


request(site_url, function (error, response, body) {
  let $ = cheerio.load(body);
  var data = [];
  $('tr').each(function(i, elem) {

    var permission = $(this).find('code').first().text();
    var aLink = $(this).find('a').first();
    var absolute_url = site_url + aLink.attr('href').substring(1);
    var splitted_name = aLink.text().split('.');
    var file_Type;
    if(splitted_name.length > 1){
      file_Type = splitted_name[splitted_name.length-1]}
    else {
      file_Type = "";
    }
    data.push([permission, absolute_url, file_Type]);
  });

  writeTocsvFile(__dirname + '/collect.csv', data);




})

