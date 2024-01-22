import styles from "./ErrorPage.module.scss";

export function ErrorPage() {
  return (
    <div id={styles.containerError}>
      <h1>Oops! 404</h1>
      <p>Desculpe, um erro não esperado ocorreu</p>
      <p>Página não encontrada</p>
    </div>
  );
}
