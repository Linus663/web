import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { word, meaning, language } = await request.json();

    const prompt = `Generate a simple example sentence using the word "${word}" (meaning: "${meaning}") in ${language}.
    Then provide a Traditional Chinese (繁體中文) translation of the sentence.
    Format the response as a JSON object with two fields: "sentence" and "translation".
    The sentence should be natural and demonstrate the word's usage.
    The translation MUST be in Traditional Chinese characters.
    Example format:
    {
      "sentence": "The example sentence in the target language",
      "translation": "繁體中文翻譯"
    }`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates example sentences and provides Traditional Chinese translations. Always use Traditional Chinese characters (繁體中文) for translations."
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
