const User = require('../models/User');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const authConfig = require('../config/auth');


class Authenticate {
  async execute({ email, password }){
    const user = await User.findOne({where : {email: email}});
    try{
      if (!user){
        throw new Error('Email/Senha incorreto');
      }

      //user.password - Senha criptografada
      //password - senha não criptografada
      //Utilizar bcryptjs para criptografar

      const passwordIgual = await compare(password, user.password); //Retorna true se é igual

      if(!passwordIgual){
        throw new Error('Email/Senha incorreto');
      }

      if (passwordIgual){
        const token = sign(
          {},       //Payload - Permissões do usuário
          authConfig.jwt.secret, //Chave Secreta
          { //Configurações do Token
            subject: user.id.toString(), //ID do usuário - A quem pertence o Token
            expiresIn: authConfig.jwt.expiresIn, //Quando expira - Pesquisar Refresh Token
          }
        );

        return {user, token};
      } else {
        throw new Error('Email/Senha incorreto');
      }
    }catch(err){
      const token = null;
      const user = null;
      return { user, token };
    }

  }
}

//export default Authenticate;
module.exports = Authenticate;
