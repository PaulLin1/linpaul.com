import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Markdown({
    children,
    wide = false,
}: {
    children: string;
    /** Drop the readable-measure cap so the text runs the full column width.
     *  Used when the page has no images to sit beside the text. */
    wide?: boolean;
}) {
    return (
        <div className={`markdown${wide ? " markdown--wide" : ""}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {children.trim()}
            </ReactMarkdown>
        </div>
    );
}
