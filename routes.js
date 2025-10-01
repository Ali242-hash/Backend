const express = require("express")
const dbHandler = require("./dbHandler")
const JWT = require("jsonwebtoken")

require("dotenv").config()

const SECRET = process.env.SECRET || "kolbasz3434322"
const TIMEOUT = process.env.TIMEOUT || "1h"

const router = express.Router()


router.post("/registration",async(req,res)=>{

  const{regUser,regPass}=req.body

  if(!regUser) return res.status(400).json({message:"Felhasznalo hiaynzik"}).end()

  if(!regPass) return res.status(400).json({message:"Felhasznalo hiaynzik"}).end()

  const oneUser = await dbHandler.userIQ.findOne({

    where:{username:regUser}
  })

  if(oneUser) return res.status(409).json({message:"A felhasználónév már foglalt"}).end()

  await dbHandler.userIQ.create({

    username:regUser,
    password:regPass
  })

  return res.status(201).json({message:"Sikeres regisztráció"}).end()
})

router.post("/login",async(req,res)=>{

  const{loginUser,loginPass}=req.body

  if(!loginUser) return res.status(400).json({message:"Felhasznalo hiaynzik"}).end()

  if(!loginPass) return res.status(400).json({message:"Felhasznalo hiaynzik"}).end()

  const oneUser = await dbHandler.userIQ.findOne({

    where:{username:loginUser,password:loginPass}
  })

  if(!oneUser) return res.status(401).json({message:"Hibás felhasználónév vagy jelszó"}).end()

const token = JWT.sign({username:oneUser.username},SECRET,{expiresIn:TIMEOUT})

  return res.status(200).json({message:"Sikeres bejelentkezés",token}).end()
})

router.get("/artworks",async(req,res)=>{

  const AllArtworks = await dbHandler.Artworks.findAll()

  res.status(200).json({message:"Műalkotások listája",data:AllArtworks}).end()
})

router.post("/artworks",Auth(),async(req,res)=>{

  const{newTitle,newValue}=req.body

  if(!newTitle) return res.status(400).json({message:"Cim hiaynzik"}).end()

  if(newValue==null) return res.status(400).json({message:"Ertek hiaynzik"}).end()

  const oneArt = await dbHandler.Artworks.findOne({

    where:{title:newTitle,value:newValue}
  })

  if(oneArt) return res.status(409).json({message:"Már létezik ilyen című műalkotás"}).end()

  await dbHandler.Artworks.create({

    title:newTitle,
    value:newValue
  })

  return res.status(201).json({message:"Új műalkotás sikeresen hozzáadva"}).end()
})

router.delete("/artworks/:id",Auth(),async(req,res)=>{

  const{id}=req.params


  const oneArt = await dbHandler.Artworks.findOne({

    where:{id}
  })

  if(!oneArt) return res.status(404).json({message:"A megadott műalkotás nem található"}).end()

  await dbHandler.Artworks.destroy({

    where:{id}
  })

  return res.status(200).json({message:"Műalkotás sikeresen törölve"}).end()
})


function Auth(){

  return(req,res,next)=>{

    const auth = req.headers.authorization

    try{

      const DecodToken = JWT.verify(auth,SECRET)

      req.username = DecodToken.username
      next()

    }

    catch(error){

      res.status(401).json({message:"Érvénytelen vagy hiányzó token"}).end()
    }
  }
}




module.exports = router