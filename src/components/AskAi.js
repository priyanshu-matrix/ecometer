import React from "react";
import { useState } from "react";
import axios from "axios";

const AskAi = () => {
  const PORT = "http://localhost:4000";
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const clearOnClick = () => {
    setResponse("");
  };

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${PORT}/ask-ai`,
        { prompt: input },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      setResponse(res.data.response);
    } catch (error) {
      console.error(error);
      setResponse("Error fetching AI response.");
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (text) => {
    // Replace newlines with HTML line breaks
    let formattedText = text.replace(/\\n/g, "<br />");

    // Bold text enclosed in ** **
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Italic text enclosed in * *
    formattedText = formattedText.replace(/\*(.*?)\*/g, "<i>$1</i>");

    // Underline text enclosed in __ __
    formattedText = formattedText.replace(/__(.*?)__/g, "<u>$1</u>");

    // Handle lists
    formattedText = formattedText.replace(/^- (.*)$/gm, "<li>$1</li>");
    formattedText = formattedText.replace(
      /<li>(.*?)<\/li>/g,
      "<ul><li>$1</li></ul>"
    );

    // Handle numbered lists
    formattedText = formattedText.replace(/^\d+\. (.*)$/gm, "<li>$1</li>");
    formattedText = formattedText.replace(
      /<li>(.*?)<\/li>/g,
      "<ol><li>$1</li></ol>"
    );

    // Handle code blocks
    formattedText = formattedText.replace(
      /```(.*?)```/gs,
      "<pre><code>$1</code></pre>"
    );

    // Handle inline code snippets
    formattedText = formattedText.replace(/`(.*?)`/g, "<code>$1</code>");

    // Handle headings
    formattedText = formattedText.replace(/^# (.*)$/gm, "<h1>$1</h1>");
    formattedText = formattedText.replace(/^## (.*)$/gm, "<h2>$1</h2>");
    formattedText = formattedText.replace(/^### (.*)$/gm, "<h3>$1</h3>");
    formattedText = formattedText.replace(/^#### (.*)$/gm, "<h4>$1</h4>");
    formattedText = formattedText.replace(/^##### (.*)$/gm, "<h5>$1</h5>");
    formattedText = formattedText.replace(/^###### (.*)$/gm, "<h6>$1</h6>");

    // Handle links
    formattedText = formattedText.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2">$1</a>'
    );

    return formattedText;
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        E-Calulator
      </h1>
      <h5 style={{ textAlign: "center", marginBottom: "20px", color: "grey" }}>
        Ask anything about your appliances energy consumption and ways to save
        energy.
      </h5>
      <h5 style={{ textAlign: "center", marginBottom: "20px", color: "grey" }}>
        Kindly provide the details of your appliance (Name, Power Rating) and
        its usage duration.
      </h5>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Ask me..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ borderRadius: "5px", borderColor: "#ddd" }}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={sendMessage}
          style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}
        >
          Ask
        </button>
      </div>
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {response && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            borderRadius: "5px",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: formatResponse(response),
            }}
            style={{ marginBottom: "15px", color: "#333" }}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={clearOnClick}
            style={{ backgroundColor: "#6c757d", borderColor: "#6c757d" }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default AskAi;
