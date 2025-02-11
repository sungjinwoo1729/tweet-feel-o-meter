
import React, { useState } from "react";
import { analyzeSentiment } from "../services/sentimentAnalysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast({
        title: "Please enter some text",
        description: "The text field cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeSentiment(text);
      setSentiment(result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze sentiment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (label: string) => {
    switch (label) {
      case "positive":
        return "text-green-500";
      case "negative":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Sentiment Analyzer
          </h1>
          <p className="text-gray-600">
            Analyze the sentiment of any text using AI
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Enter your text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Type or paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <Button
              onClick={handleAnalyze}
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Sentiment"
              )}
            </Button>
          </CardContent>
        </Card>

        {sentiment && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Analysis Result</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className={`text-2xl font-bold ${getSentimentColor(sentiment.label)}`}>
                {sentiment.label.charAt(0).toUpperCase() + sentiment.label.slice(1)}
              </div>
              <div className="text-gray-600">
                Confidence Score: {Math.round(sentiment.score * 100)}%
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
