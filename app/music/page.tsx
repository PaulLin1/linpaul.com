import React from "react";
import Line from "../components/Line";

// Replace these with your actual SoundCloud track URLs
const tracks: string[] = [
    "https://soundcloud.com/ngc00000/storm",
    "https://soundcloud.com/ngc00000/now-at-last-i-know",
    "https://soundcloud.com/ngc00000/being-harsh",
];

function embedUrl(trackUrl: string) {
    return (
        "https://w.soundcloud.com/player/?url=" +
        encodeURIComponent(trackUrl) +
        "&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
    );
}

export default function MusicPage() {
    return (
        <>
            <style>{`
                .music-scroll {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .music-scroll::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

            <div
                style={{
                    position: "fixed",
                    top: "5rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "min(700px, 90vw)",
                    bottom: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <Line as="h1">Music</Line>

                <div
                    className="music-scroll"
                    style={{
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        flex: 1,
                    }}
                >
                    {tracks.map((url, i) => (
                        <iframe
                            key={i}
                            width="100%"
                            height="166"
                            scrolling="no"
                            frameBorder="no"
                            allow="autoplay"
                            src={embedUrl(url)}
                            style={{ display: "block" }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
