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

    const activity = await Activity.findByPk(idActivity)

    res.json(await activity.addCountries(idCountry))
})

module.exports = router