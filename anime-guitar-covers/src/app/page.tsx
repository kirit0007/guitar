"use client";
import { useState } from 'react';
import Hero from '@/components/Hero';
import VideoGrid from '@/components/VideoGrid';
import VideoPlayer from '@/components/VideoPlayer';

export default function Home() {
    const [activeVideo, setActiveVideo] = useState<{ id: string, title: string } | null>(null);

    return (
        <main className="min-h-screen bg-navy-dark text-off-white font-sans selection:bg-butterfly-blue/30 selection:text-butterfly-blue-glow">
            <Hero />
            <VideoGrid onPlay={(id, title) => setActiveVideo({ id, title })} />
            <VideoPlayer
                videoId={activeVideo?.id || null}
                title={activeVideo?.title || ''}
                onClose={() => setActiveVideo(null)}
            />
        </main>
    );
}
