const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const { title } = require('process')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const courseRoutes = require('./routes/courses')
const cardRoutes = require('./routes/card')
const app = express()
const Handlebars = require('handlebars')
const User = require('./modules/user')

const hbs = exphbs.create({
    defaultLayout: 'main', 
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  });

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use( async (req,res,next) => {
    try {
    const user = await User.findById('61b9d0b6ab97d4fcdf12dcd4') 
    req.user = user
    next()
    } catch (e) {
     console.log(e)   
    }

})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}))
app.use('/',homeRoutes)
app.use('/add',addRoutes)
app.use('/course',courseRoutes)
app.use('/card',cardRoutes)

const PORT = process.env.PORT || 3000

async function start(){
    try {
    const url = `mongodb+srv://akylbek:101191@cluster0.asi1a.mongodb.net/shop`
    await mongoose.connect(url, {useNewUrlParser: true})
    const candidate = await User.findOne()
    if (!candidate) {
        const user = new User({
          email:'akylbekmuratbekuulu@gmail.com',
          name:'Akylbek',
          cart: {items: []}
        })
      await user.save()
    }
    app.listen(PORT, () => {
        console.log(`server is runinng on port ${PORT}`)
    })
    }catch (e) {
     console.log(e)
    }
}
start()





