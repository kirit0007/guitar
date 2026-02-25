"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, X } from 'lucide-react';

interface VideoPlayerProps {
    videoId: string | null;
    title: string;
    onClose: () => void;
}

export default function VideoPlayer({ videoId, title, onClose }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (videoId && videoRef.current) {
            setIsLoading(true);
            videoRef.current.play().catch(() => console.log('Autoplay blocked'));
            setIsPlaying(true);
        }
    }, [videoId]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const total = videoRef.current.duration;
            setProgress((current / total) * 100);
        }
    };

    const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = pos * videoRef.current.duration;
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            playerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <AnimatePresence>
            {videoId && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-navy-dark/95 backdrop-blur-xl flex justify-center items-center p-4 md:p-10"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-off-white/60 hover:text-butterfly-blue transition-colors z-50 p-2 bg-navy-light/50 rounded-full"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <motion.div
                        initial={{ scale: 0.95, y: 30 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(58,134,255,0.15)] border border-butterfly-blue/20 relative group"
                        ref={playerRef}
                    >
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                                <div className="w-12 h-12 border-4 border-butterfly-blue border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#3A86FF]"></div>
                            </div>
                        )}

                        <video
                            ref={videoRef}
                            src={videoId || ''}
                            className="w-full h-full object-contain"
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={() => setIsPlaying(false)}
                            onLoadedData={() => setIsLoading(false)}
                            onWaiting={() => setIsLoading(true)}
                            onPlaying={() => setIsLoading(false)}
                            onClick={togglePlay}
                        />

                        {/* Custom Controls UI */}
                        <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-dark via-navy-dark/80 to-transparent pt-24 pb-6 px-6 transition-opacity duration-300 ${!isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>

                            <div className="flex flex-col gap-4">
                                <h3 className="text-off-white font-heading text-xl shadow-sm tracking-wide">{title}</h3>

                                {/* Progress Bar */}
                                <div
                                    className="w-full h-2 bg-navy-light/80 rounded-full cursor-pointer relative group/scrub"
                                    onClick={handleScrub}
                                >
                                    <div
                                        className="absolute top-0 left-0 h-full bg-butterfly-blue rounded-full relative"
                                        style={{ width: `${progress}%` }}
                                    >
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-butterfly-blue-glow rounded-full shadow-[0_0_12px_#48CAE4] opacity-0 group-hover/scrub:opacity-100 transform translate-x-1/2 transition-opacity" />
                                    </div>
                                </div>

                                {/* Controls Level */}
                                <div className="flex items-center justify-between text-off-white mt-2">
                                    <div className="flex items-center gap-6">
                                        <button onClick={togglePlay} className="hover:text-butterfly-blue-glow transition-colors focus:outline-none focus:text-butterfly-blue">
                                            {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current" />}
                                        </button>

                                        <button onClick={toggleMute} className="hover:text-acoustic-brown hover:drop-shadow-[0_0_8px_#D4A373] transition-all focus:outline-none">
                                            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                                        </button>
                                    </div>

                                    <button onClick={toggleFullscreen} className="hover:text-butterfly-blue-glow transition-colors focus:outline-none focus:text-butterfly-blue">
                                        <Maximize className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
