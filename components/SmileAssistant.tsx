
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface SmileAssistantProps {
  onClose: () => void;
}

const SmileAssistant: React.FC<SmileAssistantProps> = ({ onClose }) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const buffer = ctx.createBuffer(1, dataInt16.length, sampleRate);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }
    return buffer;
  };

  const stopVoice = () => {
    if (sessionRef.current) sessionRef.current.close();
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    sourcesRef.current.clear();
    setIsVoiceActive(false);
    setIsConnecting(false);
  };

  const handleClose = () => {
    stopVoice();
    onClose();
  };

  const startVoice = async () => {
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
          },
          systemInstruction: "Tu es l'assistant vocal du 'Cabinet Dentaire Lumière' à Rabat-Agdal. Ton nom est Lumière. Tu es chaleureux et professionnel. Tu réponds aux questions sur les soins dentaires (blanchiment, implants, urgences). TU PARLES EXCLUSIVEMENT EN FRANÇAIS ET EN DARIJA MAROCAIN. Aide les patients à Agdal avec courtoisie.",
        },
        callbacks: {
          onopen: () => {
            setIsVoiceActive(true);
            setIsConnecting(false);
            const inputCtx = new AudioContext({ sampleRate: 16000 });
            const source = inputCtx.createMediaStreamSource(stream);
            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              
              const base64 = btoa(String.fromCharCode(...new Uint8Array(int16.buffer)));
              sessionPromise.then(s => s.sendRealtimeInput({ 
                media: { data: base64, mimeType: 'audio/pcm;rate=16000' } 
              }));
            };
            
            source.connect(processor);
            processor.connect(inputCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              const bytes = Uint8Array.from(atob(audioData), c => c.charCodeAt(0));
              const buffer = await decodeAudioData(bytes, ctx, 24000);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }
          },
          onclose: () => stopVoice(),
          onerror: () => stopVoice(),
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    return () => stopVoice();
  }, []);

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:left-6 sm:w-96 h-[80vh] sm:h-[600px] bg-white sm:rounded-3xl shadow-2xl flex flex-col z-[100] border border-slate-200 overflow-hidden animate-slideUp">
      {/* Header */}
      <div className="bg-blue-600 p-5 text-white flex justify-between items-center shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 00-3 3v10a3 3 0 003 3 3 3 0 003-3V3a3 3 0 00-3-3z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold">Assistant Lumière</h4>
            <span className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Français • Darija</span>
          </div>
        </div>
        <button 
          onClick={handleClose} 
          className="bg-white/10 hover:bg-white/30 p-2 rounded-xl transition-all active:scale-90"
          title="Fermer l'assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Voice Visualization Area */}
      <div className="flex-grow flex flex-col items-center justify-center bg-slate-50 p-8 space-y-8">
        <div className="relative">
          {isVoiceActive && (
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20 scale-150"></div>
          )}
          <button 
            onClick={isVoiceActive ? stopVoice : startVoice}
            disabled={isConnecting}
            className={`w-32 h-32 rounded-full flex items-center justify-center transition-all shadow-2xl ${
              isVoiceActive ? 'bg-red-500 scale-110 shadow-red-200' : 'bg-blue-600 hover:scale-105 shadow-blue-200'
            } ${isConnecting ? 'opacity-50 cursor-wait' : ''}`}
          >
            {isConnecting ? (
              <svg className="w-12 h-12 text-white animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            ) : isVoiceActive ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 00-3 3v10a3 3 0 003 3 3 3 0 003-3V3a3 3 0 00-3-3z" />
              </svg>
            )}
          </button>
        </div>

        <div className="text-center space-y-2">
          <p className="font-bold text-slate-800 text-lg">
            {isVoiceActive ? 'Je vous écoute...' : isConnecting ? 'Connexion...' : 'Appuyez pour parler'}
          </p>
          <p className="text-sm text-slate-500 max-w-[200px] mx-auto">
            {isVoiceActive ? 'Posez votre question en Français ou Darija' : 'Parlez directement à notre assistant intelligent'}
          </p>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-6 bg-white border-t space-y-4">
        <button 
          onClick={handleClose}
          className="w-full py-3 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <span>Fermer l'assistant</span>
        </button>
        
        <div className="flex justify-center gap-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest">Digital Care</span>
            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-widest">Rabat-Agdal</span>
        </div>
        <p className="text-[10px] text-slate-300 text-center uppercase tracking-tighter">Propulsé par Gemini 2.5 Live Technology</p>
      </div>
    </div>
  );
};

export default SmileAssistant;
