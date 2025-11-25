import React, { useState } from "react";

function App() {
  const [setup, setSetup] = useState("");
  const [punchline, setPunchline] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchJoke = async () => {
    setError("");
    setSetup("");
    setPunchline("");
    setHasFetched(true);
    setLoading(true);

    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      setSetup(data.setup);
      setPunchline(data.punchline);
    } catch (err) {
      setError("Could not fetch a joke. Try again.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Random Joke</h1>
        <p style={styles.subtitle}>Click the button to fetch a fresh one.</p>

        <button
          style={styles.button}
          onClick={fetchJoke}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch joke"}
        </button>

         {setup && <p style={styles.joke}>{setup}</p>}
        {punchline && <p style={styles.joke}>{punchline}</p>}

         {error && (
          <>
            <p style={styles.error}>{error}</p>
            <button style={styles.retryButton} onClick={fetchJoke}>
              Try again
            </button>
          </>
        )}

         {!setup && !error && hasFetched === false && (
          <p style={styles.noJoke}>No joke yet.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    background: "white",
    padding: "40px",
    width: "500px",
    textAlign: "center",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "8px",
    fontSize: "24px",
    fontWeight: "600",
  },
  subtitle: {
    color: "#555",
    marginBottom: "20px",
  },
  button: {
    background: "#007bff",
    color: "white",
    padding: "10px 24px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
  },
  retryButton: {
    marginTop: "10px",
    background: "#0066cc",
    color: "white",
    padding: "8px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  joke: {
    marginTop: "18px",
    fontSize: "17px",
  },
  error: {
    marginTop: "16px",
    color: "red",
    fontWeight: "500",
  },
  noJoke: {
    marginTop: "18px",
    color: "#777",
  },
};

export default App;
