"use client";

export default function TestSelector({
  selectedDuration,
  setSelectedDuration
}) {
  const durations = ["15s", "30s", "60s"];

  return (
    <div className="test-selector">
      <div className="duration-selector">
        {durations.map((duration) => (
          <button
            key={duration}
            className={`duration-btn ${selectedDuration === duration ? "active" : ""}`}
            onClick={() => setSelectedDuration(duration)}
          >
            {duration}
          </button>
        ))}
      </div>
    </div>
  );
}
