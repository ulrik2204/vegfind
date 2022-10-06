import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vegfind</title>
        <meta
          name="description"
          content="Next level supermarket tool for vegetarians and vegans!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>Hello world</main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
