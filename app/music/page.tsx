import Line from "../components/Line";
import CenteredLayout from "../components/MainLayout";

export const metadata = { title: "Music" };

const tracks: string[] = [
    "https://soundcloud.com/ngc00000/storm",
    "https://soundcloud.com/ngc00000/now-at-last-i-know",
    "https://soundcloud.com/ngc00000/being-harsh",
];

function embedUrl(trackUrl: string) {
    const params = new URLSearchParams({
        url: trackUrl,
        color: "#ff5500",
        auto_play: "false",
        hide_related: "true",
        show_comments: "false",
        show_user: "true",
        show_reposts: "false",
        show_teaser: "false",
    });
    return `https://w.soundcloud.com/player/?${params}`;
}

export default function MusicPage() {
    return (
        <CenteredLayout>
            <Line as="h1">Music</Line>
            <div
                className="no-scrollbar"
                style={{
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    maxHeight: "60vh",
                }}
            >
                {tracks.map((url) => (
                    <iframe
                        key={url}
                        width="100%"
                        height="166"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        loading="lazy"
                        src={embedUrl(url)}
                        title={url}
                        style={{ display: "block" }}
                    />
                ))}
            </div>
        </CenteredLayout>
    );
}
