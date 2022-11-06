var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/credentials/:user/:pass/:captcha', function(req, res){
  
  url = 'http://www.imdb.com/title/tt1229340/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", release : "", genero : ""};

      $('.sc-80d4314-1').filter(function(){
        var data = $(this);
        title = data.children().first().text().trim();
        release = data.children().last().text();

        json.title = title;
        json.release = release;
      })

      $('.sc-16ede01-8').filter(function(){
        var data = $(this);
        genero = data.children().first().text().trim();

        json.genero = genero;
      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Localhost on port 8081');
exports = module.exports = app;