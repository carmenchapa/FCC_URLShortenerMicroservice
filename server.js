 /******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/


/*
https://carmen-chapa-fcc-url-shortener.glitch.me/new/http://www.google.com

https://carmen-chapa-fcc-url-shortener.glitch.me/new/http://foo.com:80
*/


var fs = require('fs');
var express = require('express');
var app = express();

var str;
var original_url
  
app.get('/new/:protocol?/?/:url', function(req, res){
  
  var own_url = 'https://' + req.headers.host
  str = Math.random().toString(16).substring(3, 7) + Math.random().toString(16).substring(5, 7);
  var short_url = own_url + '/' + str;
  original_url = req.params.protocol + '//' + req.params.url;
  var obj = {original_url, short_url}
  
  // var pattern = /(http(s)?)/gi
  
  var pattern = /^(http:\/\/www\.|https:\/\/www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  
  if(pattern.test(original_url)){
    res.json(obj); 
  }else{
    res.send('Error: URL not valid')
  }
  
})


app.get('/:short', function (req, res) {
  
    if (req.params.short = str){
      res.redirect(original_url);
    }
  
})



 //****************************************************//

if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

app.use('/public', express.static(process.cwd() + '/public'));

app.route('/_api/package.json')
  .get(function(req, res, next) {
    console.log('requested');
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });
  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});
