import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    const res = await axios.post("http://localhost:5000/shorten", {
      longUrl: url
    });
    setShortUrl(res.data.shortUrl);
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>URL Shortener</h2>
      <input
        style={{ padding: 10, width: "40%" }}
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleShorten} style={{ padding: 10, marginLeft: 10 }}>
        Shorten
      </button>

      {shortUrl && (
        <h3 style={{ marginTop: 20 }}>
          Short URL: <a href={shortUrl}>{shortUrl}</a>
        </h3>
      )}
    </div>
  );
}

export default App;
