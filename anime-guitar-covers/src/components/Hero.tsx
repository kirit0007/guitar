"use client";
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div className="relative w-full overflow-hidden min-h-[60vh] flex items-center justify-center py-20">
            {/* Background Animated Butterflies */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className={`butterfly animate-float ${i % 2 === 0 ? 'animate-float-delayed' : ''} animate-glow`}
                        style={{
                            top: `${Math.random() * 80 + 10}%`,
                            left: `${Math.random() * 80 + 10}%`,
                            animationDuration: `${Math.random() * 4 + 4}s`
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="glass-card rounded-3xl p-8 md:p-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12"
                >
                    {/* Using a placeholder for the GIF specifically requested */}
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shrink-0 border-2 border-butterfly-blue/40 shadow-[0_0_20px_rgba(58,134,255,0.3)] bg-navy-light flex items-center justify-center">
                        {/* The user provided a GIF in their prompt, replace src with the real GIF */}
                        <img src="/chibi-guitarist.gif" alt="Chibi Guitarist" className="w-full h-full object-cover opacity-80 mix-blend-screen" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        <span className="absolute text-off-white/40 text-sm p-4 text-center pointer-events-none">Provide /public/chibi-guitarist.gif</span>
                    </div>

                    <div className="flex flex-col text-center md:text-left gap-4">
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-off-white tracking-tight">
                            Utkarsh's <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-butterfly-blue to-butterfly-blue-glow inline-block mt-2">
                                Guitar Covers
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-acoustic-brown font-light bg-navy-dark/50 inline-block px-4 py-2 rounded-full md:self-start border border-acoustic-brown/20 shadow-inner">
                            Acoustic & Anime Melodies
                        </p>
                        <p className="text-off-white/70 max-w-md mt-4 leading-relaxed text-sm md:text-base">
                            Dive into a collection of acoustic renditions, bringing a touch of warmth and anime-inspired aesthetics to your favorite tunes.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
