const SignupRepository = require("../repositories/singup.repository")    

class SignupService {
    signupRepository = new SignupRepository();

    signup = async({nickname, password, confirm})=>{
        const existUser = await this.signupRepository.existUser({nickname})
        if(existUser.length)throw new Error('중복된 닉네임입니다');
        

        const signupUser = await this.signupRepository.signupUser({nickname, password})
        return {
            userId : signupUser.null,
            nickname : signupUser.nickname,
            password : signupUser.password,
            createdAt : signupUser.createdAt,
            updatedAt : signupUser.updatedAt
        };
    }

    // exist = async({nickname})=>{
    // }

}

module.exports = SignupService;