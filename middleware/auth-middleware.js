// JWT검증
const jwt = require("jsonwebtoken")
const{ User }= require("../models") 

module.exports = (req, res ,next)=>{
    const {token} = req.cookies
    if(!token){
        res.status(400).send({msg:"로그인 후 사용하세요"})
        return;
    }
    // JWT검증
    try{
        const {userId} = jwt.verify(token, "my-secret-keykey");
        // console.log(userId)
        // 사용자가 DB에 있는지 확인
        User.findByPk(userId).then((user)=>{
            res.locals.user = user;
            console.log(user)
            next();
        });
    }catch(error){
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요'
        })
        return;
    }
};