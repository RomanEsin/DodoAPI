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

        var images = [
            "https://dodopizza-a.akamaihd.net/static/combotemplates/292/25__snk_drink_sauce.jpg",
            "https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/e7325a879cba451fa1faafb39e6f68f5_292x292.png",
            "https://dodopizza-a.akamaihd.net/static/combotemplates/292/3_30_thinv5.jpg",
            "https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/b6fcbf6db3424541830c0b723d085373_292x292.png",
            "https://dodopizza-a.akamaihd.net/static/combotemplates/292/Privet.jpg",
            "https://dodopizza-a.akamaihd.net/static/combotemplates/292/4_dodsterv2.jpg",
            "https://dodopizza-a.akamaihd.net/static/combotemplates/292/2_25_snack/combo2_discount.jpg",
            "https://dodopizza-a.akamaihd.net/static/combotemplates/292/30_2_snack/combo4_discount.jpg",
            "https://dodopizza-a.akamaihd.net/static/combotemplates/292/2_30/combo5_discount.jpg",
            "https://dodopizza-a.akamaihd.net/static/combotemplates/292/3_30/combo7_discountv2.jpg",
            "https://dodopizza-a.akamaihd.net/static/combotemplates/292/5_30/combo8_discountv2.jpg",
            "https://dodopizza-a.akamaihd.net/static/combotemplates/292/7_30/combo9_discountv2.jpg",
            "https://dodopizza-a.akamaihd.net/static/combotemplates/292/10_30/combo10_discountv2.jpg"
        ]

        for (var i = 0; i < names.length; i++) {
            let id = urls[i].rawAttrs.split(' ')[0].split('=')[1].slice(1, -1).split('_')[3]
            var obj = {id: id, name: names[i].childNodes[0].rawText, description: descriptions[i].childNodes[2].rawText, price: parseInt(prices[i].childNodes[0].childNodes[0].rawText)};
            if (i < images.length) {
                obj.img = images[i];
            }

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