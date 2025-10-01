/*
const express = require("express")
const dbHandler = require("./dbHandler")
const JWT = require("jsonwebtoken")
const { where } = require("sequelize")

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

router.put("/Artworks",async(req,res)=>{

  const{id,value}=req.body

   if(!id) return res.status(400).json({message:'hiányzó ID'}).end()

   if(!value)  return res.status(400).json({ message: 'hiányzó érték' }).end()

    const oneArt = await dbHandler.Artworks.findOne({

      where:{id}
    })
    if(!oneArt) return res.status(400).json({message:"nincs ilyen műalkotás"}).end()

      await dbHandler.Artworks.update({

        value
      },
        
        {
          where:{id}
        })

 res.status(200).json({message:'sikeres módosítás'}).end()
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
*/
const express = require("express");
const dbHandler = require("./dbHandler");

const router = express.Router();

// Registration
router.post("/registration", async (req, res) => {
  const { regUser, regPass } = req.body;

  if (!regUser) return res.status(400).json({ message: "Felhasznalo hiaynzik" });
  if (!regPass) return res.status(400).json({ message: "Jelszó hiaynzik" });

  const oneUser = await dbHandler.userIQ.findOne({ where: { username: regUser } });
  if (oneUser) return res.status(409).json({ message: "A felhasználónév már foglalt" });

  await dbHandler.userIQ.create({ username: regUser, password: regPass });

  return res.status(201).json({ message: "Sikeres regisztráció" });
});

// Login
router.post("/login", async (req, res) => {
  const { loginUser, loginPass } = req.body;

  if (!loginUser) return res.status(400).json({ message: "Felhasznalo hiaynzik" });
  if (!loginPass) return res.status(400).json({ message: "Jelszó hiaynzik" });

  const oneUser = await dbHandler.userIQ.findOne({ where: { username: loginUser, password: loginPass } });
  if (!oneUser) return res.status(401).json({ message: "Hibás felhasználónév vagy jelszó" });

  return res.status(200).json({ message: "Sikeres bejelentkezés" });
});

// Get all artworks
router.get("/artworks", async (req, res) => {
  const AllArtworks = await dbHandler.Artworks.findAll();
  res.status(200).json({ message: "Műalkotások listája", data: AllArtworks });
});

// Create new artwork
router.post("/artworks", async (req, res) => {
  const { newTitle, newValue } = req.body;

  if (!newTitle) return res.status(400).json({ message: "Cim hiaynzik" });
  if (newValue == null) return res.status(400).json({ message: "Ertek hiaynzik" });

  const oneArt = await dbHandler.Artworks.findOne({ where: { title: newTitle, value: newValue } });
  if (oneArt) return res.status(409).json({ message: "Már létezik ilyen című műalkotás" });

  await dbHandler.Artworks.create({ title: newTitle, value: newValue });

  return res.status(201).json({ message: "Új műalkotás sikeresen hozzáadva" });
});

// Delete artwork
router.delete("/artworks/:id", async (req, res) => {
  const { id } = req.params;

  const oneArt = await dbHandler.Artworks.findOne({ where: { id } });
  if (!oneArt) return res.status(404).json({ message: "A megadott műalkotás nem található" });

  await dbHandler.Artworks.destroy({ where: { id } });

  return res.status(200).json({ message: "Műalkotás sikeresen törölve" });
});

// Update artwork
router.put("/artworks", async (req, res) => {
  const { id, value } = req.body;

  if (!id) return res.status(400).json({ message: "hiányzó ID" });
  if (!value) return res.status(400).json({ message: "hiányzó érték" });

  const oneArt = await dbHandler.Artworks.findOne({ where: { id } });
  if (!oneArt) return res.status(400).json({ message: "nincs ilyen műalkotás" });

  await dbHandler.Artworks.update({ value }, { where: { id } });

  res.status(200).json({ message: "sikeres módosítás" });
});

module.exports = router;




