import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Pulppo Code Challenge</title>
                <meta
                    name="description"
                    content="Pulppo - Comprar y vender propiedades"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Bienvenido a{" "}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://pulppo.com"
                    >
                        pulppo
                    </a>
                </h1>
                <a href="/search" className={styles.primaryBtn}>
                    Buscar mi próximo hogar
                </a>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{" "}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    );
};

export default Home;
