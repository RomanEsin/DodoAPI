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

        var images = {
            // Combos 
            "73AE1E392BCC42C680895D0B80F44FB6": "https://dodopizza-a.akamaihd.net/static/combotemplates/292/25__snk_drink_sauce.jpg",
            "42F69F9A18084651B8555BDD96E2BA45": "https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/e7325a879cba451fa1faafb39e6f68f5_292x292.png",
            "E546665BAE78438685D68497711B8841": "https://dodopizza-a.akamaihd.net/static/combotemplates/292/3_30_thinv5.jpg",
            "11EAA6368A28AB6E8504848A34C63070": "https://dodopizza-a.akamaihd.net/static/Img/ComboTemplates/b6fcbf6db3424541830c0b723d085373_292x292.png",
            "F216F48B67344D04B466CB459003DA81": "https://dodopizza-a.akamaihd.net/static/combotemplates/292/Privet.jpg",
            "B9C9F2F920BE49EEAE9F72AED31C53F6": "https://dodopizza-a.akamaihd.net/static/combotemplates/292/4_dodsterv2.jpg",
            "4303E61A80D44BE98745652E320FAE67": "https://dodopizza-a.akamaihd.net/static/combotemplates/292/2_25_snack/combo2_discount.jpg",
            "57B6FDEA218A405EB9BACFAF3D624EA0": "https://dodopizza-a.akamaihd.net/static/combotemplates/292/30_2_snack/combo4_discount.jpg",
            "FBE5C50F3F9E4BAE9EFE7F93E8CCFE2E": "https://dodopizza-a.akamaihd.net/static/combotemplates/292/2_30/combo5_discount.jpg",
            "6CF41AEE3FB84F25856A997C5EA272A3": "https://dodopizza-a.akamaihd.net/static/combotemplates/292/3_30/combo7_discountv2.jpg",
            "625ED2AA2F8B43CDB73BFE2C0D9106AD": "https://dodopizza-a.akamaihd.net/static/combotemplates/292/5_30/combo8_discountv2.jpg",
            "580072E5E79E4928B08D7FCBA987363C": "https://dodopizza-a.akamaihd.net/static/combotemplates/292/7_30/combo9_discountv2.jpg",
            "E527D2F4569A419DAA1449441111CA49": "https://dodopizza-a.akamaihd.net/static/combotemplates/292/10_30/combo10_discountv2.jpg",

            // Pizzas
            "159": "https://cdn.dodostatic.net/static/Img/Products/c1d628642bfb45a6be2a6368142a8dd2_292x292.jpeg",
            "222": "https://cdn.dodostatic.net/static/Img/Products/1e414bf6663645f592d166329e1fec83_292x292.jpeg",
            "219": "https://cdn.dodostatic.net/static/Img/Products/04dff3cf16144112aabdd5f79182f663_292x292.jpeg",
            "184": "https://cdn.dodostatic.net/static/Img/Products/f57b939a4455453daade38016f61d766_292x292.jpeg",
            "185": "https://cdn.dodostatic.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_292x292.jpeg",
            "15": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/c2da53ec-00e2-4446-a4e6-74b83ed0b357.jpg",
            "182": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/dd59dcd5-cbf7-44e9-a5bd-1654ef06e6a3.jpg",
            "183": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/dcc14f3c-0bcd-4e22-9c94-d694750a790b.jpg",
            "114": "https://cdn.dodostatic.net/static/Img/Products/b1ffa66f2ebb4e959122e54eaa071109_292x292.jpeg",
            "13": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/4df905b0-0a43-4e95-a096-8e470918a267.jpg",
            "20": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/c7dae007-a646-49da-9240-d0d164be662c.jpg",
            "16": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/a89a7652-0f1f-4286-b41b-ef4c14c98331.jpg",
            "86": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/da60bf3d-c89b-4b3a-a0a7-61c4cd8f6a40.jpg",
            "202": "https://cdn.dodostatic.net/static/Img/Products/85782ebdab0143248ecd82feaf23cb1b_292x292.jpeg",
            "10": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/ecd9d5b3-0cfc-4138-9559-18d9631fe8aa.jpg",
            "4": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/b952eb17-77b8-4a14-b982-42fbf5ceaf0e.jpg",
            "2": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/856f9b5a-9dc7-4cb6-85cc-7aefe66edfcb.jpg",
            "12": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/b61cca95-caa6-4952-94b2-6896098b4f53.jpg",
            "14": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/895590f5-b88c-4bba-baf9-134f9ee48302.jpg",
            "24": "https://cdn.dodostatic.net/static/Img/Products/5b24a14f4f6c4718802adc796cd65ae3_292x292.jpeg",
            "127": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/accc2ec9-5a93-4fb4-94bf-9006ce23fede.jpg",
            "145": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/f7011a11-9c35-4428-a68a-d0c51ac3e538.jpg",
            "17": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/f4c69cd6-f8ba-4454-b493-a993a4be73cd.jpg",
            "9": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/2869bdc5-4370-4703-8a84-871b8bc66d60.jpg",
            "7": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/ac08a6eb-a136-4e76-83bc-bdd5253ff123.jpg",
            "3": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/743b12bc-5fbf-4872-8eaa-728b2709ccbf.jpg",
            "76": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/dd9cb28e-ede2-46cf-8e95-79d31e407819.jpg",
            "122": "https://cdn.dodostatic.net/static/Img/Products/Pizza/ru-RU/d6fc87f3-2870-43fb-97d9-d0bbea460f63.jpg",
            "175": "https://cdn.dodostatic.net/static/Img/Products/750065aab4ea45268fac2f17d4c56183_292x292.jpeg"
        }

        for (var i = 0; i < names.length; i++) {
            let id = urls[i].rawAttrs.split(' ')[0].split('=')[1].slice(1, -1).split('_')[3]

            var obj = {
                id: id, 
                name: names[i].childNodes[0].rawText, 
                description: descriptions[i].childNodes[2].rawText, 
                price: parseInt(prices[i].childNodes[0].childNodes[0].rawText.replace(/\s+/g, ''))};
            if (images[id]) {
                obj.img = images[id];
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