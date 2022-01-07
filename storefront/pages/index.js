import styles from "../styles/home.module.css";
import Link from "next/link";
import { createClient } from "../utils/client";
import { FaGithub } from "react-icons/fa";
import { formatPrices } from "../utils/prices";
import { useContext } from "react";
import StoreContext from "../context/store-context";

export default function Home({ products }) {
  const { cart } = useContext(StoreContext)
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
              Minha Loja Virtual{" "}
            <span role="img" aria-label="Rocket emoji">
              🚀
            </span>
          </h1>
          <p className={styles.description}>
            Essa é a página da minha loja virtual, nesse espaço eu posso colocar uma mensagem de boas vindas ou até outras coisas
          </p>
          <div className={styles.tags}>
            <div className={styles.tag} style={{ background: "lightgrey" }}>
              v{process.env.NEXT_PUBLIC_APP_VERSION}
            </div>
            
          </div>
          
        </div>
        <div className={styles.products}>
          <h2>Produtos</h2>
          <div className={styles.grid}>
            {products &&
              products.map((p) => {
                return (
                  <div key={p.id} className={styles.card}>
                    <Link
                      href={{ pathname: `/product/[id]`, query: { id: p.id } }}
                      passHref
                    >
                      <a>
                        <div>
                          <h2>{p.title}</h2>
                          <p>{formatPrices(cart, p.variants[0])}</p>
                        </div>
                      </a>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const client = createClient();
  const { products } = await client.products.list();

  return {
    props: {
      products,
    },
  };
};
