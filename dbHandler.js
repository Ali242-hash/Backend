const{Sequelize,DataTypes}=require("sequelize")
const dbHandler = new Sequelize("data","root","",{host:"localhost",dialect:"mysql"})

const UserTable = dbHandler.define("UserIQ",{

  id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },

  username:{

    type:DataTypes.STRING,
    allowNull:false
  },
  
  password:{

    type:DataTypes.STRING,
    allowNull:false
  }
})

const ArtworkTable = dbHandler.define("Artworks",{

  id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },

  title:{

    type:DataTypes.STRING,
    allowNull:false
  },
  
  value:{

    type:DataTypes.INTEGER,
    allowNull:false,
    validate:{
      min:0
    }
  }
})


exports.userIQ = UserTable
exports.Artworks = ArtworkTable