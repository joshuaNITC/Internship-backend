const users = require("../models/userSchema");
const moment=require("moment")

exports.userpost = async (req, res) => {
  // 1. fname,lname,... from body
  // 2. image
  // console.log(req.file);
  // console.log(req.body);
  const file = req.file.filename;
  const { fname, lname, email, mobile, gender, location, status } = req.body;
  if (
    !fname ||
    !lname ||
    !email ||
    !mobile ||
    !gender ||
    !location ||
    !status ||
    !file
  ) {
    res.status(401).json("All inputs required");
  }

  try {
    //to check is data already exists
    const preuser=await users.findOne({email:email})
    if(preuser){
        res.status(401).json("This user already exists ");
    }else{
        const dateCreated=moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
        const userData=new users({
            fname, lname, email, mobile, gender, location, status,profile:file,dateCreated
        })
        await userData.save();
        res.status(200).json(userData)
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("catch block error ");
  }
};
