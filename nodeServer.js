//import http library
const http = require('http');

//create server object (Event Emitter)
http.createServer((request, response) => {
  //properties in the request object 
  //(Instance of the IncomingMessage obj)
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
    //ReadableStream can be listened to  & piped
    //grab the data chunks and push each onto the body (buffer)
  }).on('data', (chunk) => {
    body.push(chunk);
    //and concat each toStringed chunk from DATA portion
    //THEN add buffer to body in the END portion, guaranteeing
    //that the message chunks have ended.
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // BEGINNING OF NEW STUFF

    response.on('error', (err) => {
      console.error(err);
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    // Note: the 2 lines above could be replaced with this next one:
    // response.writeHead(200, {'Content-Type': 'application/json'})

    // const responseBody = { headers, method, url, body };
    const message = randomQuoteEmitter();
    const responseBody = { message };

    response.write(JSON.stringify(responseBody));
    response.end();
    // Note: the 2 lines above could be replaced with this next one:
    // response.end(JSON.stringify(responseBody))

    // END OF NEW STUFF
  });

function randomQuoteEmitter(){
    let quotes = [
        'Haben sie gehort, das Deutsche Band?',
        'A tolls a toll, and a rolls a roll, and if we don\'t get no tolls then we don\'t eat no rolls.',
        'Yes we have Nosferatu, we have Nosferatu today!',
        'So long and thanks for all the fish, so sad it had to come to this.',
        'This is my BOOM STICK!',
        'I see Blue, he looks glorious.',
        'I\'m sworn to carry your burden.',
        'From days of long ago, from uncharted regions of the universe, comes a legend...',
        'Ah, buckle this. Ludicrous speed! GO!',
        'Be excellent to each other!'
    ];

    let randomNumber = getRandomNum();
    // console.log(quotes[randomNumber]);
    return quotes[randomNumber];
    // document.getElementById("textBox").textContent = quotes[randomNumber];

}

function getRandomNum() {
    let randomNumber = Math.floor(10*(Math.random()));
    // console.log(randomNumber);
    return randomNumber;
}

}).listen(3000);