const Group = require("../model/group");



module.exports.updateGroup = async (req, res, next) =>{
  // const users = await User.insert()
  try{
      const {groupname,members,matchId} = req.body;

      // console.log(members)
  
      // const hashedPassword = await bcrypt.hash(password, 10);


      const group = await Group.updateOne(
        { groupname:groupname },

        // { $addToSet: members:{$addToSet:  [members]  } },
        { $set: { members: members } },
      
      );

      console.log(group)
      // delete user.password;
      return res.json({ status: true, group });
  }catch (ex) {
      next(ex);
  }

}


module.exports.createGroup = async (req, res, next) =>{
    // const users = await User.insert()
    try{
        const {groupname,members,matchId} = req.body;

    
        // const hashedPassword = await bcrypt.hash(password, 10);
        const group = await Group.create({
          
            groupname,
            matchId,
            members
        });
        // delete user.password;
        return res.json( group );
    }catch (ex) {
        next(ex);
    }

}

module.exports.getAllGroups = async (req, res, next) => {
    try {
      const { user } = req.body;
      console.log(user)
      var id = user._id;
      const groups = await Group.find({
        
        members: {
          $in: [id]
        },
          
      })


      // console.log(users)
      return res.json(groups);
    } catch (ex) {
      next(ex);
    }
  };