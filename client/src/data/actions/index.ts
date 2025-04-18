"use server"

import { generateText } from "ai"
import { createOpenAI } from '@ai-sdk/openai';
import { strapiClient } from "@/lib/strapi-sdk";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const model = openai('gpt-4o');

export async function ImproveTextAction(text: string): Promise<string> {
  try {
    const { text: improvedText } = await generateText({
      model,
      system:
        "You are a professional editor who improves text to make it sound more professional, coherent, and articulate. Maintain the original meaning but enhance clarity, grammar, vocabulary, and overall quality. Keep a similar length to the original.",
      prompt: `Please improve the following text to make it sound more professional and articulate:\n\n${text}`,
    })

    return improvedText
  } catch (error) {
    console.error("Error in ImproveTextAction:", error)
    throw new Error("Failed to improve text")
  }
}

export async function AnalyzeTextAction(originalText: string, improvedText: string): Promise<string> {
  try {
    const { text: analysis } = await generateText({
      model,
      system:
        "You are a professional editor who improves text to make it sound more professional, coherent, and articulate. Maintain the original meaning but enhance clarity, grammar, vocabulary, and overall quality. Keep a similar length to the original.",
      prompt: `Please analyze the following text and provide a detailed analysis of the changes made:\n\nOriginal Text: ${originalText}\n\nImproved Text: ${improvedText}`,
    })

    return analysis
  } catch (error) {
    console.error("Error in AnalyzeTextAction:", error)
    throw new Error("Failed to analyze text")
  }
}

export async function SaveToHistoryAction(originalText: string, improvedText: string, analysis: string): Promise<void> {
  console.log(originalText, improvedText)
  const data = await strapiClient.collection('histories').create({
    originalText: originalText,
    improvedText: improvedText,
    analysis: analysis,
  })
  console.log(data)
}
