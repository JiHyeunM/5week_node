const LoginService = require("../services/login.service")

class LoginController {
    loginService = new LoginService()

    login = async(req,res)=>{
        const {nickname, password} = req.body;
        if(req.cookies.token){
            res.status(400).send({msg:"이미 로그인한 회원임"})
            return;
        }

        const Login = await this.loginService.login({nickname,password})
        res.cookie("token", Login)
        res.status(200).send({"token":Login})
    }
}

module.exports = LoginController;