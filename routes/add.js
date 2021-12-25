const {Router} = require('express')
const router = Router()
const Course = require('../modules/course')
const auth = require('../middleware/auth')

router.get('/', auth, (req,res) => {
    res.render('add', {
        title:'Добавить курсы',
        isAdd:true
       })
})

router.post('/', auth, async (req,res) => {
    // const course = new Course(req.body.title, req.body.price, req.body.img)
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user
    })

    try {
       await course.save()
       res.redirect('/course')
    } catch (e) {
       console.log(e)
    }
 
})

module.exports = router