const express = require('express')
const path = require('path')
const csrf = require('csurf')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const helmet = require('helmet')
const compression = require('compression')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const { title } = require('process')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const courseRoutes = require('./routes/courses')
const ordersRoutes = require('./routes/orders')
const cardRoutes = require('./routes/card')
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const Handlebars = require('handlebars')
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')
const errorHandler = require('./middleware/error')
const fileMiddleware = require('./middleware/file')
const keys = require('./keys')
require('dotenv').config()




const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main', 
    extname: 'hbs',
    helpers: require('./utill/hbs.helpers'),
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  });

const store = new MongoStore({
  collection: 'sessions',
  uri: keys.MONGODB_URI

})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images',express.static(path.join(__dirname, 'images')))
app.use(express.urlencoded({extended:true}))
app.use(session({
  secret: keys.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  store

}))

app.use(fileMiddleware.single('avatar'))
app.use(csrf())
app.use(flash())

app.use(varMiddleware)
app.use(userMiddleware)




app.use('/',homeRoutes)
app.use('/add',addRoutes)
app.use('/course',courseRoutes)
app.use('/card',cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 3000

async function start(){
    try {
    await mongoose.connect(keys.MONGODB_URI, {useNewUrlParser: true})


    app.listen(PORT, () => {
        console.log(`server is runinng on port ${PORT}`)
    })
    }catch (e) {
     console.log(e)
    }
}
start()





