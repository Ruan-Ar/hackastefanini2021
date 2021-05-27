import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import { Curso } from '../models/curso';

const URL_ALUNO = 'http://localhost:3000/stefanini/aluno';
const URL_PROFESSOR = 'http://localhost:3000/stefanini/professor';
const URL_CURSO = 'http://localhost:3000/stefanini/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  constructor(private httpClient: HttpClient) {}

  /* // #pegabandeira
  listar(filtro: Partial<Curso>): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(URL_CURSO, {
      params: filtro,
    });
  } */

  obter() {}

  incluir(curso: Curso): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL_CURSO, curso);
  }

  alterar(curso: Curso): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL_CURSO, curso);
  }

  excluir() {}
}
