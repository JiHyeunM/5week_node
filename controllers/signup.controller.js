const SignupService = require("../services/signup.service")
const Joi = require("joi")

class SignupController {
    signupService = new SignupService()

    signup = async(req,res,next)=>{
        try{
            const check = Joi.object({
                nickname: Joi.string().pattern((new RegExp('^[a-zA-Z0-9]{3,20}$'))).required(),
                password: Joi.string().min(4),
                confirm: Joi.string().min(4)
                });
            const {nickname, password, confirm} = await check.validateAsync(req.body);

            if(password !== confirm){
                res.status(400).send({
                    errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다'
                })
                return; 
            }
            if(nickname == password){
                res.status(400).send({
                    errorMessage : "아이디와 패스워드가 같습니다"
                })
            }
            const signupUser = await this.signupService.signup({nickname, password, confirm})
            res.status(201).send({data:signupUser, msg:"회원가입 완료"})
            // next();
        }catch(error){
            console.log(error.message)
            res.status(400).send({msg:"조건에 안 맞음"})
        }
    }


}

module.exports = SignupController;