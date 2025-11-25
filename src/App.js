import React, { useState } from "react";

function App() {
  const [joke, setJoke] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setError("");
    setJoke("");
    setLoading(true);

    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");

      if (!res.ok) {
        throw new Error("Failed to fetch joke");
      }

      const data = await res.json();
      setJoke(data.setup);
      setTimeout(() => setJoke(data.punchline), 10);  
    } catch (err) {
      setError("Could not fetch a joke. Try again.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Random Joke</h1>
        <p style={styles.subtitle}>Click the button to fetch a fresh one.</p>

        {/* Main Fetch Button */}
        <button
          style={styles.button}
          onClick={fetchJoke}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch joke"}
        </button>

         {joke && <p style={styles.joke}>{joke}</p>}

        {error && (
          <>
            <p style={styles.error}>{error}</p>

             <button style={styles.retryButton} onClick={fetchJoke}>
              Try again
            </button>
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
    cursor: "pointer",
  },
  retryButton: {
    marginTop: "10px",
    background: "#0066cc",
    color: "white",
    padding: "8px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "15px",
  },
  joke: {
    marginTop: "20px",
    fontSize: "18px",
  },
};

export default App;
