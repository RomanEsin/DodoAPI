# Dodo Pizza API

This API allows you to fetch data from [Dodo Pizza Website](https://dodopizza.ru) by scraping HTML elements from it.

If you would like to add another service to fetch data from mare sure to contribute to this repo and make a pull request!

### Impotant: Only use websites that allow web scraping!


Returns an obect in this format:
```
Response {
  combos: [{id: String,
            name: String,
            description: String,
            price: Int
            }],
            
  pizzas: [{id: String,
            name: String,
            description: String,
            price: Int
            }],
            
  other: [{id: String,
            name: String,
            description: String,
            price: Int
            }]            
}
```
