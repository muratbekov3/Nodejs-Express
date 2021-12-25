const {Router} = require('express')
const User = require('../modules/user')
const router = Router()

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    })
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    })
   
})

router.post('/login', async (req, res) => {
    const user = await User.findById('61b9d0b6ab97d4fcdf12dcd4')
    req.session.user = user
    req.session.isAuthenticated = true
    req.session.save( err => {
        if(err){
            throw err
        }
        res.redirect('/')
    })

})

module.exports = router