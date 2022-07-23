import Head from "next/head";
import { useState } from "react";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [token, setToken] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function getDalle2() {
    setError(false);
    setLoading(true);
    fetch(`https://labs.openai.com/api/labs/tasks/api/dalle2?k=sess-3pXjVwAIZji4wA3s2JJR0Cih5tk7yilSF3ZqvfA7&q=${query}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create DALLE 2 App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Create images with <span className={styles.titleColor}>text</span></h1>
        <p className={styles.description}>
          <input
            id="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Query"
          />
          <button onClick={getDalle2}>Get Images</button>
        </p>{" "}
        {error ? (
          <div className={styles.error}>Something went wrong..Try again</div>
        ) : (
          <></>
        )}
        {loading && <p>Loading...</p>}
        <div className={styles.grid}>
          {results.map((result) => {
            return (
              <div className={styles.card}>
                <img className={styles.imgPreview} src={result.generation.image_path} />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
