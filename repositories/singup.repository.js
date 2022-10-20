const { User } = require('../models');

class signupRepository {
    signupUser = async({nickname, password})=>{
        const createUser = await User.create({nickname, password})
        
        return createUser;
    }
    existUser = async({nickname})=>{
        // console.log({nickname})
        const users = await User.findAll({where:{nickname}});
        // console.log(users)
        return users;
    }
    
}

module.exports = signupRepository;