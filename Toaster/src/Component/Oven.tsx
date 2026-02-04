import { useEffect, useState } from "react";

// Possible oven modes
type Mode = "off" | "bake" | "grill" | "both";

export default function Oven() {
  // Current oven mode (off, bake, grill, both)
  const [mode, setMode] = useState<Mode>("off");

  // Current temperature of the oven
  const [currentTemp, setCurrentTemp] = useState(20);

  // Temperature the user wants to reach
  const [targetTemp, setTargetTemp] = useState(200);

  // Runs whenever mode or target temperature changes
  useEffect(() => {
    // If oven is off, do nothing
    if (mode === "off") return;

    // Every 1 second, increase the temperature
    const interval = setInterval(() => {
      setCurrentTemp(prev => {
        // If target temperature is reached
        if (prev >= targetTemp) {
          setMode("off"); 
          return prev;    
        }

        let increase = 0;

        // Decide heating speed based on mode
        if (mode === "bake") increase = 2;   
        if (mode === "grill") increase = 3;  
        if (mode === "both") increase = 5;   

        // Increase temperature
        return prev + increase;
      });
    }, 1000);

    // Cleanup interval when mode changes or component unmounts
    return () => clearInterval(interval);
  }, [mode, targetTemp]);

  return (
    <div>
      <h2>Oven Simulator</h2>

      {/* Display current temperature */}
      <p>Current Temperature: {currentTemp}°C</p>

      {/* Input for target temperature */}
      <input
        type="number"
        value={targetTemp}
        onChange={e => setTargetTemp(Number(e.target.value))}
      />

      {/* Mode selector */}
      <select
        value={mode}
        onChange={e => setMode(e.target.value as Mode)}
      >
        <option value="off">Off</option>
        <option value="bake">Bake Only</option>
        <option value="grill">Grill Only</option>
        <option value="both">Bake and Grill</option>
      </select>
    </div>
  );
}