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
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/text-analyzer/${endpoint}`,
        {
          method: "POST",
          mode: 'no-cors',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );

      const data: SambaNovaResponse = await response.json();

      // Extract the content from the response
      const content = data.choices[0].message.content;

      // Convert endpoint name from kebab-case to camelCase
      const camelCaseKey = kebabToCamelCase(endpoint) as keyof AnalysisResult;

      // Update the state with the content
      setAnalysisResult((prev) => ({
        ...prev,
        [camelCaseKey]: content,
      }));
    } catch (error) {
      console.error("Error analyzing text:", error);
    }
  };

  console.log({ analysisResult });

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

      <div className="flex space-x-4 mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => analyzeText("key-characters")}
        >
          Key Characters
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => analyzeText("language-detection")}
        >
          Language Detection
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          onClick={() => analyzeText("sentiment-analysis")}
        >
          Sentiment Analysis
        </button>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          onClick={() => analyzeText("summary")}
        >
          Summary
        </button>
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
