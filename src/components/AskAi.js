import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
require("dotenv").config();
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AskAi = () => {
  const PORT = process.env.PORT || "http://localhost:5000";
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [appliance, setAppliance] = useState([]);
  const [data, setData] = useState([]);

  const getAppliance = async () => {
    try {
      const response = await fetch(`${PORT}/api/appliances-chart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setAppliance(json);

      // Transform the data into the desired format
      const formattedData = json.map((item) => ({
        name: item.applianceName,
        KiloWatt_Hour: item.energyConsumption,
        // pv: item.energyConsumption,
        amt: 2400,
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching or processing appliance data:", error);
    }
  };
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

  //api for deleting appliance

  const deleteAppliance = async (id) => {
    try {
      const response = await fetch(`${PORT}/api/delete-appliance/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      const updatedAppliance = appliance.filter((appliance) => appliance._id !== id);
      setAppliance(updatedAppliance);

      // Transform the data into the desired format
      const formattedData = json.map((item) => ({
        name: item.applianceName,
        KiloWatt_Hour: item.energyConsumption,
        // pv: item.energyConsumption,
        amt: 2400,
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error deleting appliance:", error);
    }
  };

  const OnClickDelete = (id) => {
    deleteAppliance(id);
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
  // console.log(appliance);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (localStorage.getItem("token")) {
        getAppliance();
      }
    }, 2000); // Update every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  return (
    <>
      <div
        className="container"
        style={{
          maxWidth: "800px",
          margin: "20px auto",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          backgroundColor: "#e0ffcd",
          display: "flex", // Added to align items horizontally
          flexDirection: "column", // Ensure items are stacked vertically
          alignItems: "center", // Center items horizontally
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/392/392071.png"
            alt="Energy Saving Tips"
            style={{ width: "50px", height: "50px", marginRight: "10px", marginBottom: " 15px" }} // Added margin for spacing
          />
          <h1
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#2e7d32",
              marginTop: "0",
            }}
          >
            E-Calculator
          </h1>
        </div>
        <h5
          style={{ textAlign: "center", marginBottom: "20px", color: "grey" }}
        >
          Ask anything about your appliances energy consumption and ways to save
          energy.
        </h5>
        <h5
          style={{ textAlign: "center", marginBottom: "20px", color: "grey" }}
        >
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
      <div
        style={{
          width: "auto",
          height: "300px",
          margin: "0 auto",
          backgroundColor: "#ddeedf",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="KiloWatt_Hour"
              fill="#35495e"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          backgroundColor: "#f5feff",
        }}
      >
        <h3
          style={{ textAlign: "center", marginBottom: "20px", color: "#2e7d32" }}
        >
          Appliance List
        </h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {data.map((item) => (
            <li
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #ddd",
              }}
            >
              <span style={{ color: "black" }}>
                {item.applianceName}:
                <span className="mx-3" style={{ color: "black" }}>
                  {item.energyConsumption} KwH ~Avg~
                </span>
              </span>
              <button
                className="btn btn-danger"
                onClick={() => OnClickDelete(item._id)}
                style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AskAi;
