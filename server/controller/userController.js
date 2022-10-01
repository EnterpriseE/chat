const User = require("../model/user");
const bcrypt = require("bcrypt");

module.exports.login = async (req,res,next) =>{
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });
        if (!user)
          return res.json({ msg: "Incorrect Username or Password", status: false });
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        // if (!isPasswordValid)
        //   return res.json({ msg: "Incorrect Username or Password", status: false });
        // delete user.password;
        return res.json({ status: true, user });
      } catch (ex) {
        next(ex);
      }


}


module.exports.register = async (req, res, next) =>{


    // const users = await User.insert()

    try{
        const {username,password,email} = req.body;

        if (!username){
            return res.json({ msg: "Incorrect Username", status: false });
        }
    
        // if(!password){
        //     return res.json({ msg: "Incorrect Password", status: false });
        // }
    
        // const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          
          username,
          // password: hashedPassword,
          // email,
        });
        // delete user.password;
        return res.json({ status: true, user });
    }catch (ex) {
        next(ex);
    }
  


}

module.exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        // "coverUrl",
        // "_id",
      ]);

      // console.log(users)
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  };