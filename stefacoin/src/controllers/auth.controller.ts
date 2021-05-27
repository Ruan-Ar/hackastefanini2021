import { getTime } from 'date-fns';
import jwt from 'jsonwebtoken';
import Usuario from '../entities/usuario.entity';
import Login from '../models/login.model';
import UsuarioRepository from '../repositories/usuario.repository';
import config from '../utils/config/config';
import UnauthorizedException from '../utils/exceptions/unauthorized.exception';
import { Validador } from '../utils/utils';

export default class AlunoController {
  async login(crendeciais: Usuario): Promise<Login> {
    const { email, senha } = crendeciais;

    Validador.validarParametros([{ email }, { senha }]);
    const user = await UsuarioRepository.obter({ email });
    const password = await Validador.validarSenha(senha, user.senha);
  
    // #pegabandeira resolvido
    if (email != user.email) {
      throw new UnauthorizedException('Usuario ou senha invalidos');
    }

    const accessToken = jwt.sign(
      { email: user.email, tipo: user.tipo },
      config.auth.secret,
      {expiresIn: config.auth.expiresIn}
    );

    return {
      usuario: {
        email: user.email,
        nome: user.nome,
        tipo: user.tipo,
      },
      token: accessToken,
      expires: getTime(Date.now() / 1000) + 604800,
    };
  }
}
