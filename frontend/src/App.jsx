import React, { useState } from 'react'

const App = () => {
    // const [input,setInput]=useState('');
    const [longurl,setLongurl]=useState('');
    const [shorturl,setShorturl]=useState(null)
    const handleShorten=async ()=>{
        const response=await fetch("http://localhost:5000/shorten",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({url:longurl})
        });
        const data=await response.json();
        setShorturl(data.shortId)
    }
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
      <button onClick={handleShorten} style={{ padding: 10, marginLeft: 10 }}>
        Shorten
      </button>
       {/* {shorturl && (
        <h3 style={{ marginTop: 20 }}>
          Short URL: <a href={shorturl}>{shorturl}</a>
        </h3> */}
      {/* )} */}
      </div>
  )
}

export default App
