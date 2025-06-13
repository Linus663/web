import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { topic, language } = await request.json();

    const prompt = `Given the topic "${topic}" in ${language}, generate 4 related words and their Chinese meanings.
    Format the response as a JSON object with two arrays: "words" and "meanings".
    Example format:
    {
      "words": ["word1", "word2", "word3", "word4"],
      "meanings": ["meaning1", "meaning2", "meaning3", "meaning4"]
    }`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates word associations. Always respond in JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    });

    const response = JSON.parse(completion.choices[0].message.content || "{}");

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate word associations' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { word, language } = await request.json();

    const prompt = `Generate a simple example sentence using the word "${word}" in ${language}.
    Format the response as a JSON object with two fields: "sentence" and "translation".
    Example format:
    {
      "sentence": "The example sentence in the target language",
      "translation": "The Chinese translation of the sentence"
    }`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates example sentences. Always respond in JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    });

    const response = JSON.parse(completion.choices[0].message.content || "{}");

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate example sentence' },
      { status: 500 }
    );
  }
}
