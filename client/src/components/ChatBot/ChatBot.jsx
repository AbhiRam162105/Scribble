import React, { useState } from "react";
import "./ChatBot.css";
import { analyze } from "../../../openAi/config";

function ChatBot() {
  const [aiText, setaiText] = useState("Hello, how can I assist you today?");
  const [input, setinput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAiInputChange = (e) => {
    setinput(e.target.value);
  };

  const handleAiInput = async (e) => {
    e.preventDefault();
    console.log(input);

    setIsLoading(true);
    const res = await analyze(input);
    setaiText(res);
    console.log(res);
    setIsLoading(false); // End loading
  };

  return (
    <div>
      <div className="chat-card">
        <div className="chat-header">
          <div className="h2">AI ChatBot</div>
        </div>
        <div className="chat-body scrollable">
          <div className="message incoming">
            <p>{aiText}</p>
          </div>
        </div>
        <div className="chat-footer">
          <form onSubmit={handleAiInput}>
            <input
              placeholder="Type your message"
              type="text"
              onChange={handleAiInputChange}
            />
            <button type="submit">Send</button>
          </form>
          {isLoading && <p>Getting the response...</p>}{" "}
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
