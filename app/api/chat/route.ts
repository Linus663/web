import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// 初始化 OpenAI 客戶端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // 檢查 API 金鑰
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API 金鑰未設置' },
        { status: 500 }
      );
    }

    // 從請求中獲取用戶訊息
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: '訊息不能為空' },
        { status: 400 }
      );
    }

    // 調用 OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "你是一個友善且專業的AI助手。請用繁體中文回答問題，回答要簡潔明瞭。"
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // 獲取 AI 回應
    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      return NextResponse.json(
        { error: '無法獲取 AI 回應' },
        { status: 500 }
      );
    }

    // 返回 AI 回應
    return NextResponse.json({ 
      response: aiResponse,
      timestamp: new Date().toLocaleTimeString()
    });

  } catch (error) {
    console.error('OpenAI API 錯誤:', error);
    
    // 根據錯誤類型返回不同的錯誤訊息
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'OpenAI API 金鑰無效' },
          { status: 401 }
        );
      }
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'API 請求次數已達上限，請稍後再試' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: '處理請求時發生錯誤，請稍後再試' },
      { status: 500 }
    );
  }
}
