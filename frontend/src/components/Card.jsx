import React from "react";

const Card = ({
  comments,
  isLoading,
  fetchComments,
  postUrl,
  setPostUrl,
  handleReset,
  handleCopy,
}) => {
  return (
    <div className="container h-500 p-5 shadow-xl rounded-lg">
      <h1 className="text-4xl font-bold text-center my-5 text-blue-500">
        TikTok comments scraper
      </h1>
      <div className="flex flex-wrap w-full">
        <input
          className="w-2/3 border rounded-l-md px-3 py-2"
          type="text"
          value={postUrl}
          onChange={(e) => setPostUrl(e.target.value)}
        />
        <button
          className="text-center w-1/3 bg-blue-500 rounded-r-md text-white text-lg font-bold disabled:bg-blue-300 "
          disabled={isLoading}
          onClick={fetchComments}
        >
          {isLoading ? "Fetching" : "Fetch Comments"}
        </button>
      </div>
      <div className="flex flex-row my-5">
        <div className="basis-1/2">
          <div className="font-bold text-xl ">Comments : </div>
        </div>
        <div className="basis-1/2 text-end">
          <button
            className="bg-blue-500 p-3 rounded-lg mx-3 font-bold text-white hover:bg-blue-600"
            onClick={() => handleCopy()}
          >
            copy
          </button>
          <button
            className="bg-gray-400 text-white hover:bg-gray-500 rounded-lg p-3 font-bold"
            onClick={() => handleReset()}
          >
            reset
          </button>
        </div>
      </div>
      <dir className="border rounded-lg">
        <div className=" max-h-[500px] overflow-scroll scroll-smooth overflow-x-hidden">
          <div className="p-3 rounded-md mt-3">
            {comments.length > 0 ? (
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
            ) : (
              <div>No comments found</div>
            )}
          </div>
        </div>
      </dir>
    </div>
  );
};

export default Card;
