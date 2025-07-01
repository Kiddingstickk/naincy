import { corsHeaders } from '../_shared/cors.ts';

const OPENAI_API_KEY = Deno.env.get('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');

interface RequestPayload {
  feeling: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const { feeling }: RequestPayload = await req.json();

    if (!feeling || feeling.trim().length === 0) {
      throw new Error('Feeling is required');
    }

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a poetic, emotionally intelligent AI companion for a romantic website. You reply with heartful affirmations, gentle wisdom, and encouragement in a soft, loving tone. Keep responses to 1-2 graceful lines, warm and uplifting. Always end with a nature emoji or heart emoji.'
          },
          {
            role: 'user',
            content: `I'm feeling: ${feeling}`
          }
        ],
        max_tokens: 100,
        temperature: 0.8,
      }),
    });

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const openaiData = await openaiResponse.json();
    const generatedResponse = openaiData.choices[0]?.message?.content?.trim();

    if (!generatedResponse) {
      throw new Error('No response generated');
    }

    return new Response(
      JSON.stringify({ response: generatedResponse }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error in generate-response function:', error);
    
    // Fallback responses for when AI is unavailable
    const fallbackResponses = [
      "Even in softness, you shine. Be gentle with yourself today 💚",
      "Your feelings are valid, and you're braver than you know 🌱",
      "Like a flower finding light, you always find your way 🌸",
      "Every emotion you feel is part of your beautiful complexity 🌿",
      "You're allowed to feel deeply - it's what makes you extraordinary ✨",
    ];
    
    const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

    return new Response(
      JSON.stringify({ response: fallbackResponse }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});