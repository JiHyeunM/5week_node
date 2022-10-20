const LoginRepository = require("../repositories/login.repository")
const jwt = require("jsonwebtoken")

class LoginService {
    loginRepository = new LoginRepository();

    login = async({nickname,password})=>{
        const user = await this.loginRepository.loginUser({nickname,password})
        if(!user || password !== user.password){
            throw new Error("닉네임 또는 비밀번호를 확인하세요")
        }
        // console.log(user.userId)
        //쿠키
        const token = jwt.sign({userId: user.userId}, "my-secret-keykey"); // .sign()을 해야 토큰을 만들 수 있음        
        console.log(token)
        return token;
    }
}

module.exports = LoginService;