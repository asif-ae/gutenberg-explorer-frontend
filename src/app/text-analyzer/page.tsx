"use client";

import kebabToCamelCase from "@/utils/kebabToCamelCase";
import { useState } from "react";

// Define types for the analysis result object
type AnalysisResult = {
  keyCharacters: string | null;
  languageDetection: string | null;
  sentimentAnalysis: string | null;
  summary: string | null;
};

// Define type for the response from SambaNova API
type SambaNovaResponse = {
  choices: {
    message: {
      content: string;
    };
  }[];
};

export default function TextAnalyzer() {
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>({
    keyCharacters: null,
    languageDetection: null,
    sentimentAnalysis: null,
    summary: null,
  });

  // Function to handle API requests
  const analyzeText = async (endpoint: string) => {
    if (!text) {
      return;
    }
    setLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/text-analyzer/${endpoint}`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SambaNovaResponse = await response.json();

      const content = data.choices[0].message.content;
      const camelCaseKey = kebabToCamelCase(endpoint) as keyof AnalysisResult;

      setAnalysisResult((prev) => ({
        ...prev,
        [camelCaseKey]: content,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error analyzing text:", error);
      alert('Something went wrong! Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-6 text-blue-500">
      <h1 className="text-3xl font-bold mb-4">Text Analyzer</h1>
      <textarea
        className="w-full p-4 border border-gray-300 rounded mb-4"
        rows={6}
        value={text}
        onChange={(e) => {
          setText(e.target.value);

          if (
            analysisResult.keyCharacters !== null ||
            analysisResult.languageDetection !== null ||
            analysisResult.sentimentAnalysis !== null ||
            analysisResult.summary !== null
          ) {
            // Reset the state
            setAnalysisResult({
              keyCharacters: null,
              languageDetection: null,
              sentimentAnalysis: null,
              summary: null,
            });
          }
        }}
        placeholder="Enter text here..."
      />

      <div className="flex space-x-4 mb-4 items-center">
        <button
          className={`${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded`}
          onClick={() => analyzeText("key-characters")}
          disabled={loading}
        >
          Key Characters
        </button>

        <button
          className={`${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          } text-white px-4 py-2 rounded`}
          onClick={() => analyzeText("language-detection")}
          disabled={loading}
        >
          Language Detection
        </button>

        <button
          className={`${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600"
          } text-white px-4 py-2 rounded`}
          onClick={() => analyzeText("sentiment-analysis")}
          disabled={loading}
        >
          Sentiment Analysis
        </button>

        <button
          className={`${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600"
          } text-white px-4 py-2 rounded`}
          onClick={() => analyzeText("summary")}
          disabled={loading}
        >
          Summary
        </button>
        {loading ? <div className="text-lg">Loading...</div> : <></>}
      </div>

      <div className="results mt-6">
        {analysisResult.keyCharacters && (
          <div className="mb-4">
            <h2 className="text-xl font-bold">Key Characters:</h2>
            {/* <div
              className="bg-gray-100 p-4 rounded overflow-auto max-h-48 break-words"
              dangerouslySetInnerHTML={{ __html: analysisResult.keyCharacters }}
            ></div> */}
            <p className="bg-gray-100 p-4 rounded overflow-auto max-h-48 break-words">
              {analysisResult.keyCharacters}
            </p>
          </div>
        )}

        {analysisResult.languageDetection && (
          <div className="mb-4">
            <h2 className="text-xl font-bold">Language:</h2>
            <p className="bg-gray-100 p-4 rounded">
              {analysisResult.languageDetection}
            </p>
          </div>
        )}

        {analysisResult.sentimentAnalysis && (
          <div className="mb-4">
            <h2 className="text-xl font-bold">Sentiment Analysis:</h2>
            <p className="bg-gray-100 p-4 rounded">
              {analysisResult.sentimentAnalysis}
            </p>
          </div>
        )}

        {analysisResult.summary && (
          <div className="mb-4">
            <h2 className="text-xl font-bold">Summary:</h2>
            <p className="bg-gray-100 p-4 rounded">{analysisResult.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
