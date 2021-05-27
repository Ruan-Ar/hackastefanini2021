import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import { Professor } from '../models/professor';

const URL_PROFESSOR = 'http://localhost:3000/stefanini/professor';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  constructor(private httpClient: HttpClient) {}

  // #pegabandeira
  listar(filtro: Partial<Professor>): Observable<Professor[]> {
    return this.httpClient.get<Professor[]>(URL_PROFESSOR, {
      params: filtro,
    });
  }

  obter() {}

  incluir(professor: Professor): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL_PROFESSOR, professor);
  }

  alterar(professor: Professor): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL_PROFESSOR, professor);
  }

  excluir() {}
}
