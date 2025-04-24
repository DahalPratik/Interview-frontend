"use client";

import { useState, ChangeEvent } from "react";

export default function Dashboard() {
  const [interviewStarted, setInterviewStarted] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");

  const handleResponseChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard</h1>

      {!interviewStarted ? (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">
            Start Your Visa Interview Practice
          </h2>
          <p className="mb-6">
            Are you ready to practice for your USA student visa interview? Our
            AI interviewer will ask you common F-1 visa interview questions and
            provide feedback on your responses.
          </p>
          <button
            onClick={() => setInterviewStarted(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Start Practice Interview
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Practice Interview</h2>
            <button
              onClick={() => setInterviewStarted(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              ✕ End Interview
            </button>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="font-medium text-gray-800">
              Hello, we your virtual visa officer. well be asking you some
              questions about your planned studies in the United States. Why do
              you want to study in the US instead of your home country?
            </p>
          </div>

          <div className="mb-4">
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Type your response here..."
              value={response}
              onChange={handleResponseChange}
            ></textarea>
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            Submit Response
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Your Progress</h2>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span>Practice Sessions</span>
              <span className="font-medium">0</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Confidence Score</span>
              <span className="font-medium">N/A</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Resources</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-blue-600 hover:underline flex items-center"
              >
                <span className="mr-2">📄</span>
                F-1 Visa Requirements Guide
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 hover:underline flex items-center"
              >
                <span className="mr-2">📚</span>
                Common Interview Questions
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 hover:underline flex items-center"
              >
                <span className="mr-2">💡</span>
                Tips from Successful Applicants
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
