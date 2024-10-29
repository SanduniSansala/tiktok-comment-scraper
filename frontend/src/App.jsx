import { useState } from "react";
import "./App.css";

function App() {
  const [postUrl, setPostUrl] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_url: postUrl }),
      });
      const data = await response.json();

      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  return (
    <div className="App">
      <h1>TikTok comment scraper</h1>
      <input
        type="text"
        value={postUrl}
        onChange={(e) => setPostUrl(e.target.value)}
      />
      <button onClick={fetchComments}>Fetch Comments</button>

      <div>
        <h2>Comments:</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
