const {Router} = require('express')
const {validationResult} = require('express-validator/check')
const router = Router()
const Course = require('../modules/course')
const {courseValidators} = require("../utill/validator")
const auth = require('../middleware/auth')

router.get('/', auth, (req,res) => {
    res.render('add', {
        title:'Добавить курсы',
        isAdd:true
       })
})

router.post('/', auth, courseValidators,  async (req,res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()){
      return res.status(422).render('add', {
        title:'Добавить курсы',
        isAdd:true,
        error: errors.array()[0].msg,
        data: {
            title: req.body.title,
            price: req.body.price,
            img:req.body.img,
        }

      })
  }



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