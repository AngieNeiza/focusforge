import { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState(1500);
  const [initialTime, setInitialTime] = useState(1500);
  const [running, setRunning] = useState(false);
  const [materials, setMaterials] = useState(0);
  const [city, setCity] = useState([]);

  useEffect(() => {
    let timer;

    if (running && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    if (time === 0 && running) {
      setRunning(false);
      setMaterials((prev) => prev + 10);
      alert("¡Sesión completada! Ganaste 10 materiales.");
      setTime(initialTime);
    }

    return () => clearInterval(timer);
  }, [running, time, initialTime]);

  const startFocus = () => {
    if (!running) setRunning(true);
  };

  const selectTime = (minutes) => {
    const seconds = minutes * 60;
    setTime(seconds);
    setInitialTime(seconds);
  };

  const buildHouse = () => {
    if (materials >= 20) {
      setMaterials(materials - 20);
      setCity([...city, "🏠"]);
    } else {
      alert("Necesitas 20 materiales");
    }
  };

  const buildFactory = () => {
    if (materials >= 50) {
      setMaterials(materials - 50);
      setCity([...city, "🏭"]);
    } else {
      alert("Necesitas 50 materiales");
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progress = ((initialTime - time) / initialTime) * 100;

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <h1>🏙️ FocusForge</h1>
        <p>Convierte tu concentración en una ciudad virtual</p>

        <h2 style={styles.timer}>{formatTime()}</h2>

        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>

        <div style={styles.timeButtons}>
          <button style={styles.button} onClick={() => selectTime(25)}>25 min</button>
          <button style={styles.button} onClick={() => selectTime(45)}>45 min</button>
          <button style={styles.button} onClick={() => selectTime(60)}>60 min</button>
        </div>

        <button style={styles.startButton} onClick={startFocus}>
          {running ? "Concentrándote..." : "Comenzar Focus"}
        </button>

        <h3>🧱 Materiales: {materials}</h3>

        <div>
          <button style={styles.buildButton} onClick={buildHouse}>
            Construir Casa (20)
          </button>

          <button style={styles.buildButton} onClick={buildFactory}>
            Construir Fábrica (50)
          </button>
        </div>

        <h2 style={{ marginTop: "30px" }}>🏗️ Tu ciudad</h2>

        <div style={styles.city}>
          {city.length === 0 ? "Tu ciudad está vacía..." : city.join(" ")}
        </div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#141e30,#243b55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
    color: "white"
  },

  card: {
    background: "#1e293b",
    padding: "40px",
    borderRadius: "15px",
    width: "420px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
  },

  timer: {
    fontSize: "48px",
    margin: "10px 0"
  },

  progressBar: {
    height: "10px",
    background: "#334155",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "20px"
  },

  progressFill: {
    height: "100%",
    background: "#22c55e"
  },

  timeButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "15px"
  },

  button: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "8px",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer"
  },

  startButton: {
    marginTop: "10px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#22c55e",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  },

  buildButton: {
    margin: "8px",
    padding: "8px 14px",
    border: "none",
    borderRadius: "8px",
    background: "#f59e0b",
    color: "white",
    cursor: "pointer"
  },

  city: {
    fontSize: "40px",
    marginTop: "15px",
    minHeight: "50px"
  }
};

export default App;