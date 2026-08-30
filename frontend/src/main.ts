import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Elemento #app não encontrado");
}

app.innerHTML = `
  <h1>SellCore funcionando!</h1>
  <p>HTML + CSS + TypeScript estão conectados.</p>
`;