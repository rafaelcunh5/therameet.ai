import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { question, businessInfo } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY não configurada" },
        { status: 500 }
      );
    }

    if (!question) {
      return NextResponse.json(
        { error: "Pergunta não enviada" },
        { status: 400 }
      );
    }

    const prompt = `
Você é um assistente virtual treinado para responder clientes no WhatsApp.

Informações do negócio:
${businessInfo}

Pergunta do cliente:
${question}

Responda de forma natural, educada e útil.
`;

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "Você é um atendente profissional via WhatsApp." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const answer = completion.choices?.[0]?.message?.content;

    return NextResponse.json({ answer });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erro desconhecido" },
      { status: 500 }
    );
  }
}
