import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // Elegant local fallback stream if no OpenAI API Key is present in the environment
    if (!process.env.OPENAI_API_KEY) {
      const lowerInput = messages[messages.length - 1].content.toLowerCase();
      let responseText = "";

      if (lowerInput.includes("filer") || lowerInput.includes("tax") || lowerInput.includes("fbr") || lowerInput.includes("income")) {
        responseText = "Active Taxpayer (Filer) registration with FBR is highly beneficial. By becoming a Filer, you reduce your withholding taxes by 50% on properties, vehicle purchases, and banking transactions. Our senior consultant, Advocate Ahmad Raza, handles wealth statement reconciliation and annual income tax filing for both salaried individuals and registered business companies. Would you like to schedule an FBR audit or NTN filing consultation?";
      } else if (lowerInput.includes("secp") || lowerInput.includes("company") || lowerInput.includes("register") || lowerInput.includes("incorporation")) {
        responseText = "We provide fast-track Securities & Exchange Commission of Pakistan (SECP) incorporation services. Standard SMC-Private or Private Limited company setup takes only 3 to 5 working days. This includes securing company name reservation, drafting custom Memorandum and Articles of Association, and processing final KYC forms. Would you like to register your corporate company today?";
      } else if (lowerInput.includes("bail") || lowerInput.includes("court") || lowerInput.includes("police") || lowerInput.includes("litigation") || lowerInput.includes("case")) {
        responseText = "For urgent legal matters, our High Court litigation specialist, Advocate Khalil ur Rehman Butt, manages our elite criminal defense desk. We prepare protective, pre-arrest, and post-arrest bail petitions for Lahore High Court, Session Courts, and Police Station representation. If this is an emergency, please use the WhatsApp contact or book an urgent appointment immediately.";
      } else {
        responseText = "Welcome to the Digital Law Chamber AI Assistant. I am trained to assist you with FBR Income Tax returns (salaried & business), SECP corporate company registrations, property registries, and High Court bail litigation. Please let me know what legal or tax query you have today, or schedule a formal consultation with our senior advocates!";
      }

      const textEncoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const words = responseText.split(' ');
          for (const word of words) {
            // Vercel AI SDK text stream format prepended with '0:'
            const chunk = `0:${JSON.stringify(word + ' ')}\n`;
            controller.enqueue(textEncoder.encode(chunk));
            await new Promise(r => setTimeout(r, 40)); // realistic typing delay
          }
          controller.close();
        }
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Experimental-Stream-Data': 'true'
        }
      });
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
