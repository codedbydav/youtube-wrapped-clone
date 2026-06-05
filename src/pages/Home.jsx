import React, { useState } from 'react';

export default function Home() { 
    const [history, setHistory] = useState([]);
    const [fileName, setFileName] = useState("");

    const handleFileUpload = async (event) => {
        try {
            const file = event.target.files[0];
            if (!file) return;
            setFileName(file.name);
            const text = await file.text();
            const jsonData = JSON.parse(text);
            setHistory(jsonData);
        } catch (error) {
            console.error("Error parsing file:", error);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
      <h1>YouTube Wrapped Clone</h1>

      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
      />

      <p>
        File:
        {" "}
        {fileName || "Belum ada"}
      </p>

      <p>
        Total Records:
        {" "}
        {history.length}
      </p>
    </div>
  );
}

{history.length > 0 && (
  <>
    <h2>First Record</h2>
    <pre>{JSON.stringify(history, null, 2)}</pre>
  </>
)}

{history.slice(0, 10).map((item, index) => (
  <div
    key={index}
    style={{
      border: "1px solid #ccc",
      padding: "1rem",
      marginBottom: "1rem"
    }}
  >
    <h3>{item.title}</h3>

    <p>
      Artist:
      {" "}
      {item.subtitles?.[0]?.name}
    </p>

    <p>
      Date:
      {" "}
      {item.time}
    </p>
  </div>
))}