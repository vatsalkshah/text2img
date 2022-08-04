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
    fetch(`/api/dalle2?k=sess-ohijNJAIDPhJpfGuuSIebnfr9maBQCGszWRmEQik=${query}`, {
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
        <title>Create images with text</title>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FT6EVMBH3P"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '[Tracking ID]', { page_path: window.location.pathname });
            `,
          }}
        />
      </Head>

      <main className={styles.main}>

        <a href="https://rloop.org" target="_blank"><img src="https://cdn.discordapp.com/attachments/782551842663301120/1003207466328277023/rloop_logo.png" width="100" height="100"></img></a>
        <h1 className={styles.title}>Create NFTs with <span className={styles.titleColor}>text</span></h1>
        <p className={styles.description}>
          <input
            id="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Your text ideas go here..."
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
