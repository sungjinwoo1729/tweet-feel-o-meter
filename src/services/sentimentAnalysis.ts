
import { pipeline } from '@xenova/transformers';

let analyzer: any = null;

export const initializeSentimentAnalyzer = async () => {
  if (!analyzer) {
    analyzer = await pipeline(
      "sentiment-analysis",
      "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
    );
  }
  return analyzer;
};

export const analyzeSentiment = async (text: string) => {
  try {
    const analyzer = await initializeSentimentAnalyzer();
    const result = await analyzer(text);
    return {
      label: result[0].label.toLowerCase(),
      score: result[0].score,
      status: "success",
    };
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return {
      label: "neutral",
      score: 0,
      status: "error",
    };
  }
};
