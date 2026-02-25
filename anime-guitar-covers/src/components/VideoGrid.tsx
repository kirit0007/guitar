"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface Video {
    id: string;
    title: string;
    thumbnailUrl: string;
    durationMillis?: string;
}

export default function VideoGrid({ onPlay }: { onPlay: (id: string, title: string) => void }) {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/videos.json')
            .then(res => res.json())
            .then(data => {
                setVideos(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch videos from local JSON file", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center text-butterfly-blue py-20 animate-pulse font-heading">Summoning melodies...</div>;

    return (
        <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-heading font-semibold text-off-white mb-8 border-b border-butterfly-blue/20 pb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-butterfly-blue rounded-full shadow-[0_0_10px_#3A86FF]"></span>
                Latest Covers
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {videos.map((video, index) => (
                    <motion.div
                        key={video.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="group relative bg-navy-light rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_10px_30px_rgba(58,134,255,0.2)] border border-transparent hover:border-butterfly-blue/40 transition-all duration-300"
                        onClick={() => onPlay(video.id, video.title)}
                    >
                        <div className="aspect-video relative overflow-hidden bg-navy-dark border-b border-butterfly-blue/10">
                            {video.thumbnailUrl ? (
                                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-off-white/20">No Thumbnail</div>
                            )}

                            <div className="absolute inset-0 bg-navy-dark/40 group-hover:bg-transparent transition-colors duration-300 flex items-center justify-center">
                                <div className="w-14 h-14 rounded-full bg-butterfly-blue/90 text-navy-dark flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_20px_#3A86FF]">
                                    <Play className="w-6 h-6 ml-1" fill="currentColor" />
                                </div>
                            </div>

                            {video.durationMillis && (
                                <div className="absolute bottom-2 right-2 bg-navy-dark/80 px-2 py-1 rounded text-xs text-acoustic-brown backdrop-blur-md">
                                    {new Date(parseInt(video.durationMillis)).toISOString().substring(14, 19)}
                                </div>
                            )}
                        </div>

                        <div className="p-5 relative glass-card border-none bg-transparent">
                            <h3 className="text-lg font-medium text-off-white truncate group-hover:text-butterfly-blue-glow transition-colors font-sans">{video.title}</h3>
                        </div>
                    </motion.div>
                ))}
                {videos.length === 0 && <div className="col-span-full text-center text-off-white/50 bg-navy-light/30 rounded-xl p-10 border border-dashed border-butterfly-blue/20">No covers found. Please check your Drive folder and Service Account permissions.</div>}
            </div>
        </div>
    );
}
