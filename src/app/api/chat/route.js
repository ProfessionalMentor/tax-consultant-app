import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // Check if OPENAI_API_KEY exists to prevent crashing for the user if they haven't set it yet
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ 
          error: "API Key Missing", 
          message: "The AI module is active, but the OpenAI API key is missing from your .env file. Please add OPENAI_API_KEY to test the chatbot." 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: `You are the chief AI legal and taxation assistant at the "Digital Law Chamber" acting on behalf of Advocate Ahmad Raza (High Court Specialist in Civil & Tech Crimes) and Advocate Khalil ur Rehman Butt (High Court Specialist in Criminal Defense). 
Your domain covers Pakistani FBR taxation compliance, SECP corporate registration, Civil Litigation, and Criminal Defense in the Lahore High Court.
You must maintain a deeply professional, highly authoritative, and intellectually rigorous Sillicon Valley/High Court tone.
Do NOT give definitive binding legal advice, advise them to book a consultation for exact verdicts. Provide clear, actionable intelligence regarding SECP rules, Income Tax Ordinance 2001, and basic legal filing steps.`,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
