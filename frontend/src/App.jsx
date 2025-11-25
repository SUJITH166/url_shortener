import React, { useEffect, useState } from "react";

const App = () => {
  // const [input,setInput]=useState('');
  const [longurl, setLongurl] = useState("");
  const [shorturl, setShorturl] = useState(null);
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState(null);
  const [customShort, setCustomShort] = useState('');
  const handleShorten = async () => {
    const response = await fetch(
      "https://url-shortener-1-pdsy.onrender.com/shorten",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: longurl, customShort }),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to shorten URL. Status: ${response.status}. Check your backend server logs on Render.`
      );
    }
   const data = await response.json();
if (data.error) {
  alert(data.error);
} else {
  setShorturl(data.shortId);
  loadurls(); // refresh the list
}

    // setShorturl(data.shortId);
    setLongurl("");
    setCustomShort('')
    loadurls();
  };

  const loadurls = async () => {
    try {
      const response = await fetch(
        "https://url-shortener-1-pdsy.onrender.com/all"
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to load URLs. Status: ${response.status}. Check your backend server logs on Render.`
        );
      }

      const data = await response.json();
      setUrls(data);
    } catch (err) {
      console.error("Error loading URLs:", err);
      setError(err.message || "An unknown error occurred while loading URLs.");
    }
  };

  const handledelete = async (id) => {
    try {
      const response = await fetch(
        `https://url-shortener-1-pdsy.onrender.com/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete URL. Status: ${response.status}. Check your backend server logs on Render.`
        );
      }
      loadurls();
    } catch (err) {
      console.error("Error loading URLs:", err);
      setError(err.message || "An unknown error occurred while loading URLs.");
    }
  };

  useEffect(() => {
    loadurls();
  }, []);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>URL Shortener</h2>
      <input
        style={{ padding: 10, width: "40%" }}
        type="text"
        placeholder="Enter URL"
        value={longurl}
        onChange={(e) => setLongurl(e.target.value)}
      />
      <input
      style={{ padding: 10, width: "10%" }}
        type="text"
        placeholder="Custom short link"
        value={customShort}
        onChange={(e) => setCustomShort(e.target.value)}
      />

      <button onClick={handleShorten} style={{ padding: 10, marginLeft: 10 }}>
        Shorten
      </button>
      {/* {shorturl && (
        <h3 style={{ marginTop: 20 }}>
          Short URL: <a href={shorturl}>{shorturl}</a>
        </h3> */}
      {/* )} */}
      {/* {urls.length>5}&&{} */}
      <h2>Stored Url</h2>
      {urls.map((item) => (
        <div key={item.id}>
          <p>
            Orginal : <span>{item.long_url}</span>
          </p>
          <p>
            Shorten Link :{" "}
            <a
              href={`https://url-shortener-1-pdsy.onrender.com/${item.short_id}`}
              target="_blank"
            >{` https://url-shortener-1-pdsy.onrender.com/${item.short_id} `}</a>
            <button onClick={() => handledelete(item.id)}> Delete</button>
          </p>
          {/* <a href={`https://url-shortener-1-pdsy.onrender.com/${item.short_id}`} target="_blank">{`https://url-shortener-1-pdsy.onrender.com/${item.short_id}`}</a> */}

          <hr />
        </div>
      ))}
    </div>
  );
};

export default App;
