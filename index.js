const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
var cors = require('cors')
const cheerio = require('cheerio')

const app = express()
app.use(cors())

const ebayUrl = 'https://www.ebay.com/globaldeals/fashion/mens-shoes-accessories'

app.get('/ebay', (req, res) => {
    axios(ebayUrl)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const ebayProducts = []

            $('.dne-itemtile', html).each(function () { 
                const title = $(this).find('.ebayui-ellipsis-2').text()
                const price = $(this).find('.dne-itemtile-detail .dne-itemtile-price').text()
                const priceBefore = $(this).find('.itemtile-price-strikethrough').text()
                const discount = $(this).find('.itemtile-price-bold').text()
                const imgUrl = $(this).find('img').attr('src')
                const url = $(this).find('a').attr('href')

                ebayProducts.push({
                    title,
                    price,
                    priceBefore,
                    discount,
                    imgUrl,
                    url
                })
            })
            res.json(ebayProducts)
        }).catch(err => console.log(err))
})



const cosmosUrl = 'https://www.cosmossport.gr/el/8444-papoutsia'

app.get('/cosmos', (req, res) => {
    axios(cosmosUrl)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const cosmosProducts = []

            $('.ajax_block_product', html).each(function () { 
                const title = $(this).find('.product-name').text().trim()
                const price = $(this).find('.mobileWishlistGrid').text().trim()
                const priceBefore = $(this).find('').text()
                const discount = $(this).find('').text()
                const imgUrl = $(this).find('img').attr('src')
                const url = $(this).find('a').attr('href')

                cosmosProducts.push({
                    title,
                    price,
                    priceBefore,
                    discount,
                    imgUrl,
                    url
                })
            })
            res.json(cosmosProducts)
        }).catch(err => console.log(err))
})


const epapoutsiaUrl = 'https://epapoutsia.gr/c/epapoutsia/etiketa_proiontos:eukairia'
const epapoutsiaBaseUrl = 'https://epapoutsia.gr'

app.get('/epapoutsia', (req, res) => {
    axios(epapoutsiaUrl)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const epapoutsiaProducts = []

            $('.product-item', html).each(function () { 
                const title = $(this).find('.product-name').text().trim()
                const price = $(this).find('.price-final').text().trim()
                const priceBefore = $(this).find('.price-regular').text().trim()
                const discount = $(this).find('.base-badge.red').text()
                const imgUrl = $(this).find('img').attr('src')
                const url = $(this).find('a').attr('href')

                epapoutsiaProducts.push({
                    title,
                    price,
                    priceBefore,
                    discount,
                    imgUrl,
                    url: epapoutsiaBaseUrl + url
                })
            })
            res.json(epapoutsiaProducts)
        }).catch(err => console.log(err))
})


const zakcretaUrl = 'https://www.zakcret.gr/prosfores/andrika/papoutsia?sort=special_discount&order=DESC'


app.get('/zakcret', (req, res) => {
    axios(zakcretaUrl)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const zakcretProducts = []

            $('#content .card', html).each(function () { 
                const title = $(this).find('h5').text().trim()
                const price = $(this).find('.product-price').text().trim()
                const priceBefore = $(this).find('.price-old').text().trim()
                const discount = $(this).find('.price-percentage').text().trim()
                const imgUrl = $(this).find('img:last-child').attr('src')
                const url = $(this).find('a').attr('href')

                zakcretProducts.push({
                    title,
                    price,
                    priceBefore,
                    discount,
                    imgUrl,
                    url
                })
            })
            res.json(zakcretProducts)
        }).catch(err => console.log(err))
})

app.get('/', (req, res) => {
    res.json('Welcome to deals API')
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))