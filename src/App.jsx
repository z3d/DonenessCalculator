import { useState, useMemo } from "react";
import "./App.css";

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
  beef: { rare: "45–50", mediumRare: "55–60", medium: "60–65", mediumWell: "65–70", wellDone: "70+" },
  lamb: { rare: "45–50", mediumRare: "55–60", medium: "60–65", mediumWell: "65–70", wellDone: "70+" },
  chicken: { wellDone: "75" },
  patties: { wellDone: "70+" },
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
  const [meat, setMeat] = useState("beef");
  const [doneness, setDoneness] = useState("rare");

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
