import React, { useState } from 'react';
import { Heart, Send } from 'lucide-react';

const MicroJournal: React.FC = () => {
  const [feeling, setFeeling] = useState('');
  const [response, setResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');

  const fallbackResponses = [
    "Even in softness, you shine. Be gentle with yourself today 💚",
    "Your feelings are valid, and you're braver than you know 🌱",
    "Like a flower finding light, you always find your way 🌸",
    "Every emotion you feel is part of your beautiful complexity 🌿",
    "You're allowed to feel deeply - it's what makes you extraordinary ✨",
    "Your heart is both strong and tender, and that's your superpower 💫",
    "Even storms pass, and you'll bloom again when you're ready 🌷",
    "You're writing your own story, one feeling at a time 📖",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeling.trim()) return;

    setIsTyping(true);
    setError('');
    setResponse('');

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase configuration missing');
      }

      const apiUrl = `${supabaseUrl}/functions/v1/generate-response`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feeling: feeling.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data.response);

    } catch (error) {
      console.error('Error calling AI function:', error);
      setError('Using a gentle fallback response...');
      
      // Use fallback response
      setTimeout(() => {
        const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        setResponse(randomResponse);
        setError('');
      }, 500);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="py-16 px-6 bg-gradient-to-br from-green-25 to-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-green-800 mb-8">
          How are you feeling today, Naincy?
        </h2>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              placeholder="Tired, quiet, soft..."
              className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-green-100 focus:border-green-300 focus:outline-none bg-white/80 backdrop-blur-sm shadow-lg font-inter placeholder-green-400"
            />
            <button
              type="submit"
              disabled={!feeling.trim() || isTyping}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>

        {(isTyping || response || error) && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-100 min-h-[120px] flex items-center justify-center relative overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 via-white/30 to-green-50/50 rounded-2xl"></div>
            
            <div className="relative z-10 w-full">
              {isTyping ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-pulse flex space-x-1">
                    <div className="h-2 w-2 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="h-2 w-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-green-600 font-inter">thinking of something beautiful...</span>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-400 border-t-transparent"></div>
                  <span className="text-green-600 font-inter text-sm">{error}</span>
                </div>
              ) : (
                <div className="flex items-start space-x-3">
                  <Heart className="w-6 h-6 text-green-500 mt-1 flex-shrink-0 animate-pulse" />
                  <p className="text-xl md:text-2xl font-playfair text-green-800 leading-relaxed text-left">
                    {response}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {response && (
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setFeeling('');
                setResponse('');
                setError('');
              }}
              className="text-green-600 hover:text-green-700 font-inter text-sm underline transition-colors duration-200"
            >
              Share another feeling
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MicroJournal;