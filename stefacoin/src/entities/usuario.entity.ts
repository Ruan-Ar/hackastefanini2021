import Entity from './entity';

export default class Usuario extends Entity {
  email: string;
  senha: string;
  nome: string;
  curso: string;
  tipo: number; // 1 - Professor    2 - Aluno

  constructor() {
    super();
  }
}
