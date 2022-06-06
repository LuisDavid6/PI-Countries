const { Router } = require('express');
const axios = require("axios")
const {Country, Activity, Op} = require("../db");

const router = Router()
const url = "https://restcountries.com/v2"

router.get("/", async (req, res, next) =>{
    // let {name} = req.query
    // if(name){
    //     try {
    //         let {name} = req.query
    //         // name = name[0].toUpperCase() + name.slice(1).toLowerCase()
    //         const country = await Country.findAll({
    //             where: {
    //                 name:{[Op.iLike]: `%${name}%`}
    //             }
    //         })
    
    //         if(!country) return res.json("Country not found")
    //         return res.json(country)
    
    //     } catch (error) {
    //         return res.status(404).json("No se obtuvieron datos")
    //     }
    // }

    try {
        const list = await Country.findAll({
            // order:[["name", "DESC"]]
        })

        if(list.length !== 0) return res.json(list)
        else{
            next()
            // try { 
            //     const {data} = await axios.get(`${url}/all`)
            //     data.map(async e=> {
            //         await Country.create({
            //             id: e.numericCode,
            //             name: e.name,
            //             flagImage: e.flags.png,
            //             continent: e.region,
            //             capital: e.capital,
            //             subregion: e.subregion,
            //             area: e.area,
            //             population: e.population
            //         })  
            //     })
            //     res.json(data)
            // } catch (error) {
            //     res.status(404).json("No se obtuvieron datos")
            // }
        }
    } catch (error) {
        res.status(404).json("No se obtuvieron datos")
    }
})

router.get("/", async (req, res) =>{
    try { 
        const {data} = await axios.get(`${url}/all`)
        data.map(async e=> {
            await Country.create({
                id: e.numericCode,
                name: e.name,
                flagImage: e.flags.png,
                continent: e.region,
                capital: e.capital,
                subregion: e.subregion,
                area: e.area,
                population: e.population
            })  
        })
        res.json(data)
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

