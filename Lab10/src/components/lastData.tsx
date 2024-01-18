import React, { useEffect, useState } from "react";

interface Entry {
  date: string;
  pressure: string;
  temperature: string;
  humidity: string;
}

function LastData() {
  const [lastEntry, setLastEntry] = useState<Entry | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3100/api/data/last');
        const result: Entry[] = await response.json();
        const lastEntry = result[result.length - 1];
        setLastEntry(lastEntry);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Last Data</h1>
      {lastEntry ? (
        <div>
          <p>Pressure: {lastEntry.pressure}</p>
          <p>Temperature: {lastEntry.temperature}</p>
          <p>Humidity: {lastEntry.humidity}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default LastData;