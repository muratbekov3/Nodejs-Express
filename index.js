const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
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
const Handlebars = require('handlebars')
const User = require('./modules/user')
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')

const MONGODB_URI = `mongodb+srv://akylbek:101191@cluster0.asi1a.mongodb.net/shop`


const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main', 
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  });

const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URI

})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')



app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}))
app.use(session({
  secret: 'some secret value',
  resave:false,
  saveUninitialized:false,
  store

}))

app.use(varMiddleware)
app.use(userMiddleware)




app.use('/',homeRoutes)
app.use('/add',addRoutes)
app.use('/course',courseRoutes)
app.use('/card',cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000

async function start(){
    try {
    await mongoose.connect(MONGODB_URI, {useNewUrlParser: true})


    app.listen(PORT, () => {
        console.log(`server is runinng on port ${PORT}`)
    })
    }catch (e) {
     console.log(e)
    }
}
start()





