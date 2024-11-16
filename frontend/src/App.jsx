import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "./components/Card";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [postUrl, setPostUrl] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    if (!postUrl) {
      toast.error("Url Required");
      return;
    }
    setIsLoading(true);
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

      toast.success("Success");
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Something went wrong");
    }
    setIsLoading(false);
  };

  const handleReset = () => {
    setComments([]);
    setPostUrl("");
  };

  const handleCopy = async () => {
    if (comments) {
      try {
        await navigator.clipboard.writeText(comments);
        toast.success("copied");
      } catch (err) {
        toast.error("Failed to copy");
      }
    } else {
      toast.error("Nothing to copy");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="container">
          <Card
            comments={comments}
            isLoading={isLoading}
            fetchComments={fetchComments}
            postUrl={postUrl}
            setPostUrl={setPostUrl}
            handleReset={handleReset}
            handleCopy={handleCopy}
          />
        </div>
      </div>
    </>
  );
}

export default App;
