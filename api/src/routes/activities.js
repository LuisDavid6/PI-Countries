const {Router} = require("express")
const {Activity} = require("../db")
const router = Router()

router.post("/", async(req, res) =>{

    const {name, difficulty, duration, season} = req.body
    const activity = await Activity.create({name, difficulty, duration, season})
    res.json(activity)

})

router.put("/addActivity", async (req, res) =>{
    const {idActivity, idCountry} = req.body    
    console.log(idActivity,idCountry)
    const activity = await Activity.findByPk(idActivity)

    res.json(await activity.addCountries(idCountry))
})

// SUSTENTACION PI
// router.put("/changeActivity", async (req, res) =>{
//     const {idActivity, duration} = req.body


    
//     const update = await Activity.update({
//         duration: duration,
//     }, {
//         where: {
//             id: idActivity,
//         }
//     });
    
//     let activity = await Activity.findByPk(1)
//     console.log(activity)
//     res.json(update)
// })



router.get("/activities", async (req, res) =>{
    try {
        const list = await Activity.findAll({
            order:[["name", "ASC"]]
        })

        res.json(list)
    } catch (error) {
        res.status(404).json("No se obtuvieron datos")
    }
})

module.exports = router