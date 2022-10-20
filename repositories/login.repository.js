const { User } = require('../models');

class loginRepository {
    loginUser = async({nickname})=>{
        const user = await User.findOne({where:{nickname}})
        return user;
    }

}

module.exports = loginRepository;