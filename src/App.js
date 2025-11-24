import React, { useState } from "react";

function App() {
  const [joke, setJoke] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // NEW: for test case 3

  const fetchJoke = async () => {
    setError("");
    setJoke("");
    setLoading(true); // disable button

    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");

      if (!res.ok) {
        throw new Error("Failed");
      }

      const data = await res.json();
      setJoke(`${data.setup} — ${data.punchline}`);
    } catch (err) {
      setError("Could not fetch a joke. Try again.");
    }

    setLoading(false); // enable button again
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Random Joke</h1>
        <p style={styles.subtitle}>Click the button to fetch a fresh one.</p>

        {/* Button disabled when loading */}
        <button
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onClick={fetchJoke}
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch joke"}
        </button>

        {joke && <p style={styles.joke}>{joke}</p>}

        {error && (
          <>
            <p style={styles.error}>{error}</p>
            <span style={styles.link} onClick={fetchJoke}>
              Try again
            </span>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f3f3",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    width: "70%",
    maxWidth: "600px",
    textAlign: "center",
    boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "10px",
  },
  subtitle: {
    color: "#666",
    marginBottom: "20px",
  },
  button: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 25px",
    fontSize: "16px",
    borderRadius: "6px",
  },
  error: {
    color: "red",
    marginTop: "15px",
  },
  link: {
    marginTop: "10px",
    color: "#0066cc",
    display: "inline-block",
    cursor: "pointer",
    textDecoration: "underline",
  },
  joke: {
    marginTop: "20px",
    fontSize: "18px",
  },
};

export default App;
