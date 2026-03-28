import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Summary {
  _id: string;
  original_text: string;
  summary: string;
}

const Dashboard: React.FC = () => {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

useEffect(() => {
  if (!token) return;
})

 const handleSummarize = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!token) return;

  try {
    const res = await axios.post(
      "http://localhost:5000/api/summaries",
      { text },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Summary: " + res.data.summary);
    setText("");

    // refresh list
    const refreshed = await axios.get(
      "http://localhost:5000/api/summaries",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setSummaries(refreshed.data);

  } catch (err) {
    console.error(err);
  }
};

return (
  <div className="min-h-screen bg-gray-100 p-8">

    <h2 className="text-3xl font-bold mb-6 text-center">
      Dashboard
    </h2>


    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">

      <form onSubmit={handleSummarize} className="space-y-4">

        <textarea
          className="w-full border p-3 rounded-md focus:ring-2 focus:ring-blue-500"
          rows={5}
          placeholder="Enter text to summarize..."
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          type="submit"
        >
          Summarize
        </button>

      </form>

    </div>

    <div className="max-w-3xl mx-auto mt-6 space-y-4">

      {summaries.map(s => (

        <div
          key={s._id}
          className="bg-white p-4 rounded-lg shadow"
        >

          <p className="text-gray-700">
            <strong>Original:</strong> {s.original_text}
          </p>

          <p className="text-blue-600 mt-2">
            <strong>Summary:</strong> {s.summary}
          </p>

        </div>

      ))}

    </div>

  </div>
);
};

export default Dashboard;