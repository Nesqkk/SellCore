import "./style.css";


/* TIPOS */

type UserRole =
  | "ADMIN"
  | "GERENTE"
  | "VENDEDOR"
  | "ESTOQUISTA";


interface User {
  nome: string;
  matricula: string;
  role: UserRole;
}


/* ELEMENTO PRINCIPAL */

function getApp(): HTMLDivElement {

  const element =
    document.querySelector<HTMLDivElement>(
      "#app"
    );

  if (!element) {
    throw new Error(
      "Elemento #app não encontrado"
    );
  }

  return element;
}


const appElement = getApp();


/*  LOGIN */

function renderLogin(): void {

  appElement.innerHTML = `

    <main class="login-page">

      <section class="login-card">

        <div class="login-logo">

          <h1>
            Sell<span>Core</span>
          </h1>

          <p>
            Sistema de Vendas e Estoque
          </p>

        </div>


        <form id="login-form">

          <div class="input-group">

            <label for="matricula">
              Matrícula
            </label>

            <input
              id="matricula"
              type="text"
              maxlength="8"
              placeholder="Digite sua matrícula"
              autocomplete="off"
              required
            />

          </div>


          <div class="input-group">

            <label for="senha">
              Senha
            </label>

            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              required
            />

          </div>


          <button
            type="submit"
            class="login-button"
          >
            Entrar
          </button>


          <p
            id="login-error"
            class="login-error"
          ></p>

        </form>

      </section>

    </main>
  `;


  configureLogin();
}


/* CONFIGURAÇÃO DO LOGIN */

function configureLogin(): void {

  const form =
    document.querySelector<HTMLFormElement>(
      "#login-form"
    );


  const matriculaInput =
    document.querySelector<HTMLInputElement>(
      "#matricula"
    );


  const senhaInput =
    document.querySelector<HTMLInputElement>(
      "#senha"
    );


  const error =
    document.querySelector<HTMLParagraphElement>(
      "#login-error"
    );


  if (
    !form ||
    !matriculaInput ||
    !senhaInput ||
    !error
  ) {
    return;
  }


  form.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const matricula =
        matriculaInput.value.trim();


      const senha =
        senhaInput.value.trim();


      error.textContent = "";


      /* VALIDAR MATRÍCULA */

      if (!/^[0-9]{8}$/.test(matricula)) {

        error.textContent =
          "A matrícula deve conter exatamente 8 números.";

        return;
      }


      /* VALIDAR SENHA */

      if (senha.length < 4) {

        error.textContent =
          "Digite uma senha válida.";

        return;
      }


      login(matricula);

    }
  );
}


/* LOGIN TEMPORÁRIO */

function login(
  matricula: string
): void {

  const usuario: User = {

    nome: "Usuário SellCore",

    matricula,

    role: "VENDEDOR"

  };


  localStorage.setItem(
    "sellcore_user",
    JSON.stringify(usuario)
  );


  console.log(
    "Usuário autenticado:",
    usuario
  );
}


/* INICIAR A APLICAÇÃO */ 
   

renderLogin();