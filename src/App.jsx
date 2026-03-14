import { useState, useEffect, useMemo } from "react";
import "./App.css";

const STORAGE_KEY = "doneness-calc";

function loadSaved() {
  try {
    var saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.meat && saved.doneness) return saved;
  } catch (e) { /* ignore */ }
  return { meat: "beef", doneness: "mediumRare" };
}

const MEATS = [
  { id: "beef", label: "Beef", emoji: "🥩" },
  { id: "lamb", label: "Lamb", emoji: "🍖" },
  { id: "chicken", label: "Chicken", emoji: "🍗" },
  { id: "patties", label: "Patties", emoji: "🍔" },
];

const DONENESS = [
  { id: "rare", label: "Rare" },
  { id: "mediumRare", label: "Medium Rare" },
  { id: "medium", label: "Medium" },
  { id: "mediumWell", label: "Medium Well" },
  { id: "wellDone", label: "Well Done" },
];

const TEMPS = {
  beef: { rare: "49–51", mediumRare: "55–57", medium: "60–63", mediumWell: "65–69", wellDone: "71+" },
  lamb: { rare: "49–51", mediumRare: "55–57", medium: "60–63", mediumWell: "65–69", wellDone: "71+" },
  chicken: { wellDone: "74" },
  patties: { wellDone: "71+" },
};

const DONENESS_COLORS = {
  rare: "#dc2626",
  mediumRare: "#ea580c",
  medium: "#d97706",
  mediumWell: "#92400e",
  wellDone: "#78350f",
};

function isFixedDoneness(meatId) {
  return meatId === "chicken" || meatId === "patties";
}

export default function App() {
  const saved = useMemo(loadSaved, []);
  const [meat, setMeat] = useState(saved.meat);
  const [doneness, setDoneness] = useState(saved.doneness);

  useEffect(function () {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ meat: meat, doneness: doneness }));
  }, [meat, doneness]);

  const availableDoneness = useMemo(
    () => (isFixedDoneness(meat) ? DONENESS.filter((d) => d.id === "wellDone") : DONENESS),
    [meat]
  );

  const effectiveDoneness = isFixedDoneness(meat) ? "wellDone" : doneness;
  const temp = TEMPS[meat][effectiveDoneness];

  function handleMeatChange(meatId) {
    setMeat(meatId);
    if (isFixedDoneness(meatId)) {
      setDoneness("wellDone");
    }
  }

  return (
    <div className="app">
      <h1>Doneness Calculator</h1>

      <section className="card">
        <h2>Meat</h2>
        <div className="meat-grid">
          {MEATS.map((m) => (
            <button
              key={m.id}
              className={`meat-btn ${meat === m.id ? "active" : ""}`}
              onClick={() => handleMeatChange(m.id)}
            >
              <span className="meat-emoji">{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Doneness</h2>
        <div className="doneness-list">
          {availableDoneness.map((d) => (
            <button
              key={d.id}
              className={`doneness-btn ${effectiveDoneness === d.id ? "active" : ""}`}
              style={
                effectiveDoneness === d.id
                  ? { "--dot-color": DONENESS_COLORS[d.id] }
                  : { "--dot-color": DONENESS_COLORS[d.id] }
              }
              onClick={() => setDoneness(d.id)}
            >
              <span className="doneness-dot" />
              {d.label}
            </button>
          ))}
        </div>
      </section>

      <section className="card result">
        <div className="temp-display">
          <span className="temp-value">{temp}</span>
          <span className="temp-unit">°C</span>
        </div>
        <p className="temp-label">internal temperature</p>
      </section>
    </div>
  );
}
