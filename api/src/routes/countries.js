const { Router } = require('express');
const axios = require("axios")
const {Country, Activity, Op} = require("../db");

const router = Router()
const url = "https://restcountries.com/v3.1"

router.get("/", async (req, res, next) =>{
    let {name} = req.query
    if(name){
        try {
            let {name} = req.query
            // name = name[0].toUpperCase() + name.slice(1).toLowerCase()
            const country = await Country.findAll({
                where: {
                    name:{[Op.iLike]: `%${name}%`}
                }
            })
    
            if(!country) return res.json("Country not found")
            return res.json(country)
    
        } catch (error) {
            return res.status(404).json("No se obtuvieron datos")
        }
    }

    try {
        const list = await Country.findAll({
            // order:[["name", "DESC"]]
        })

        if(list.length !== 0) return res.json(list)
        else{
            next()
        }
    } catch (error) {
        res.status(404).json("No se obtuvieron datos")
    }
})

router.get("/", async (req, res) =>{
    try { 
        const {data} = await axios.get(`${url}/all`)
        const countries = []
        
        data.map(async e=> {
            if(e.ccn3 && e.name.common && e.flags.png && e.continents[0] && e.capital && e.subregion && e.area && e.population){
                const country ={
                    id: e.ccn3,
                    name: e.name.common,
                    flagImage: e.flags.png,
                    continent: e.continents[0],
                    capital: e.capital[0],
                    subregion: e.subregion,
                    area: e.area,
                    population: e.population
                }
                countries.push(country)
            }
        })
        await Country.bulkCreate(countries)
        res.status(201).json(countries)
    } catch (error) {
        res.status(404).json("No se obtuvieron datos")
    }
})


router.get("/:id", async (req, res) =>{
    let {id} = req.params
    // let country = await Country.findByPk(id)
    let country = await Country.findOne({
        where: {id},
        include: Activity
    })
    res.json(country)
})


module.exports = router

