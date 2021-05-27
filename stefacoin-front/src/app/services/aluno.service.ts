import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import { Aluno } from '../models/aluno';

const URL_ALUNO = 'http://localhost:3000/stefanini/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  constructor(private httpClient: HttpClient) {}

  // #pegabandeira
  listar(filtro: Partial<Aluno>): Observable<Aluno[]> {
    return this.httpClient.get<Aluno[]>(URL_ALUNO, {
      params: filtro,
    });
  }

  obter() {}

  incluir(aluno: Aluno): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL_ALUNO, aluno);
  }

  alterar(aluno: Aluno): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL_ALUNO, aluno);
  }
  
  excluir() {}
}
