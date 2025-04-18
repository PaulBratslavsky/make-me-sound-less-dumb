"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MarkdownText } from "@/components/custom/markdown-text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ImproveTextAction,
  SaveToHistoryAction,
  AnalyzeTextAction,
} from "@/data/actions";
import { Loader2, Sparkles } from "lucide-react";

export function TextImprover() {
  const [inputText, setInputText] = useState("");
  const [improvedText, setImprovedText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("input");

  const handleImproveText = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      const result = await ImproveTextAction(inputText);
      const analysis = await AnalyzeTextAction(inputText, result);
      await SaveToHistoryAction(inputText, result, analysis);

      setImprovedText(result);
      setActiveTab("result");
      setAnalysis(analysis);
    } catch (error) {
      console.error("Error improving text:", error);
      setImprovedText(
        "Sorry, there was an error improving your text. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(improvedText);
  };

  return (
    <Card className="shadow-lg border-gray-200">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="input">Your Text</TabsTrigger>
            <TabsTrigger value="result" disabled={!improvedText}>
              Improved Text
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="mt-0">
            <div className="space-y-4">
              <Textarea
                placeholder="Enter your text here... (email, message, or any text you want to improve)"
                className="min-h-[200px] text-base p-4"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {inputText.length} characters
                </p>
                <Button
                  onClick={handleImproveText}
                  disabled={isLoading || !inputText.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Improving...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Improve My Text
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="result" className="mt-0">
            <div className="space-y-4">
              <div className="min-h-[200px] border rounded-md p-4 bg-white text-base whitespace-pre-wrap">
                {improvedText}
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setActiveTab("input")}>
                  Edit Original
                </Button>
                <Button
                  onClick={handleCopyToClipboard}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Copy to Clipboard
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      {analysis && (
        <CardContent>
          <div className="min-h-[200px] border rounded-md p-4 bg-white text-base whitespace-pre-wrap">
            <MarkdownText content={analysis} />
          </div>
        </CardContent>
      )}
    </Card>
  );
}
