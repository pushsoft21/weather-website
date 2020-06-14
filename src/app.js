const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//console.log(__dirname);
//console.log(path.join(__dirname, '../public'));
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs');
app.set('views',viewspath)
hbs.registerPartials(partialspath)


app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Pushpendra'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Pushpendra'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'This is from Help',
        name: 'Pushpendra',
        title: 'Help Page'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
                error: 'You must provide address query string'
            }
        )
    }
    
    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if(error){
         return ( res.send({error}))   
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return ( res.send({error}))   
               }
        
               res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
               })
        })
    })
    

    // res.send({
    //     forecast: 'Todays forecast',
    //     location:'Ashburn',
    //     address: req.query.address
    // });
})

app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send(
            {
                error: 'You must provide search query string'
            }
        )
    }
    res.send({
        products:[]
    });
})

app.get('/help/test', (req, res) => {
    res.render('404',{
        title:'404',
        name: 'Pushpendra',
        errormessage: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name:'Pushpendra',
        errormessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})