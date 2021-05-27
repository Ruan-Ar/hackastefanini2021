import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Usuario } from "src/app/models/usuario";
import { AlunoService } from "src/app/services/aluno.service";
import { ProfessorService } from "src/app/services/professor.service";
import { CursoService } from "src/app/services/curso.service";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  checkRadio: boolean = true;
  placeholder: string = "Digite o curso que leciona";
  user: Usuario = {};
  textButton = "Cadastrar";
  typeUser = "Professor";
  colspan = 2;

  constructor(
    private router: Router,
    private professorService: ProfessorService,
    private alunoService: AlunoService,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {}

  radioCheck(): void {
    if (this.checkRadio == false) {
      this.placeholder = "Digite o curso que deseja ser matriculado";
      this.typeUser = "Aluno";
    } else {
      this.placeholder = "Digite o curso que leciona";
      this.typeUser = "Professor";
    }
  }

  cadastrar(dado) {
    switch (dado.tipo) {
      case '1':
        this.textButton === "Cadastrar"
          ? this.cadastrarProfessor(dado)
          : this.editarProfessor(dado);
        break;

      case '2':
        this.textButton === "Cadastrar"
          ? this.cadastrarAluno(dado)
          : this.editarAluno(dado);
        break;

      case '3':
        this.textButton === "Cadastrar"
          ? this.cadastrarCurso(dado)
          : this.editarCurso(dado);
        break;

      case '4':
        this.textButton === "Cadastrar"
          ? this.cadastrarAula(dado)
          : this.editarAula(dado);
        break;
    }
  }

  cadastrarProfessor(user) {
    this.professorService.incluir(user).subscribe(
      (success) => {
        this.successMessage(user, 'incluir');
      },
      (error) => {
        this.errorMessage(user, 'incluir');
      },
      () => console.log("Requisição completa!")
    );
  }

  cadastrarAluno(user) {
    this.alunoService.incluir(user).subscribe(
      (success) => {
        this.successMessage(user, 'incluir');
      },
      (error) => {
        this.errorMessage(user, 'incluir');
      },
      () => console.log("Requisição completa!")
    );
  }

  cadastrarCurso(curso) {
    this.cursoService.incluir(curso).subscribe(
      (success) => {
        this.successMessage(curso, 'incluir');
      },
      (error) => {
        this.successMessage(curso, 'incluir');
      },
      () => console.log("Requisição completa!")
    );
  }

  cadastrarAula(aula) {}

  editarProfessor(user) {}

  editarAluno(user) {}

  editarCurso(curso) {}

  editarAula(aula) {}

  successMessage(param, oper) {
    if (oper === 'incluir') {
      console.log(`${this.typeUser} ${param.nome} incluído com sucesso!`);
      this.cancelar();
    } else {
      console.log(`${this.typeUser} ${param.nome} alterado com sucesso!`);
      this.cancelar();
    }
  }

  errorMessage(param, oper) {
    if (oper === 'incluir') {
      console.log(`Não foi possível incluir o ${this.typeUser} ${param.nome}, erro ocorrido!`);
      this.cancelar();
    } else {
      console.log(`Não foi possível incluir o ${this.typeUser} ${param.nome}, erro ocorrido!`);
      this.cancelar();
    }
  }

  limpar() {
    this.user = {};
    this.typeUser = "Professor";
  }

  cancelar() {
    this.limpar();
    this.navegar("");
  }

  navegar = (route: any) => {
    this.router.navigate([route]);
  };
}
