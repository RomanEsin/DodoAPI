const rp = require('request-promise');
const p = require('node-html-parser');

const url = 'https://dodopizza.ru/nakhodka/nahodkinskiy36';

const http = require('http');

function app(req, res) {
    let date = new Date();
    console.log(req.socket.remoteAddress, date);
    rp(url)
    .then(function(html){
        //success!
        const root = p.parse(html);

        let names = root.querySelectorAll('.sc-1x0pa1d-1')
        // console.log(names[0].childNodes[0].rawText);
        let descriptions = root.querySelectorAll('.sc-1x0pa1d-0');
        // console.log(descriptions[0].childNodes[2].rawText)
        let prices = root.querySelectorAll('.money');
        // console.log(prices[0].childNodes[0].childNodes[0].rawText);
        let urls = root.querySelectorAll('.sc-1x0pa1d-6');
        // console.log(base + urls[1].rawAttrs.split(' ')[0].split('=')[1].slice(1, -1).split('_')[3])

        var data = {combos: [], pizzas: [], other: []};

        for (var i = 0; i < names.length; i++) {
            let id = urls[i].rawAttrs.split(' ')[0].split('=')[1].slice(1, -1).split('_')[3]
            let obj = {id: id, name: names[i].childNodes[0].rawText, description: descriptions[i].childNodes[2].rawText, price: parseInt(prices[i].childNodes[0].childNodes[0].rawText)};

            if (id.length > 8) {
                data.combos.push(obj);
            } else if (i < data.combos.length + 29) {
                data.pizzas.push(obj);
            } else {
                data.other.push(obj);
            }
        }

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(data, null, 2));
  })
  .catch(function(err){
        //handle error
        console.log(err);
  });
}

const serverHttp = http.createServer(app);

serverHttp.listen(process.env.PORT || 5000);