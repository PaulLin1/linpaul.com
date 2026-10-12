// Tailwind class strings shared across pages.

export const title = "m-0 py-1 text-2xl leading-tight tracking-[-0.01em]";

export const meta = "text-sm text-soft";

/** The one scrolling box under a page's title. */
export const scroll =
    "flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain";

/** A list row: title on the left, meta on the right. */
export const row =
    "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-1 text-black no-underline hover:underline";

/** Rendered markdown. Browser defaults do most of the work. */
export const markdown = [
    "flex min-w-0 flex-col gap-2 *:m-0",
    "[&_:is(h1,h2,h3)]:leading-tight [&_h1]:text-2xl [&_h2]:text-lg [&_h3]:text-base",
    "[&_:is(ul,ol)]:ps-7 [&_li+li]:mt-0.5 [&_blockquote]:ps-4",
    "[&_img]:block [&_img]:h-auto [&_img]:w-full",
    "[&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-2",
    "[&_:is(code,pre)]:font-mono [&_pre]:overflow-x-auto [&_pre]:text-sm",
    "[&>table]:block [&>table]:overflow-x-auto [&>table]:border-collapse [&>table]:text-sm",
    "[&_:is(th,td)]:px-2.5 [&_:is(th,td)]:py-1 [&_:is(th,td)]:text-left [&_:is(th,td)]:whitespace-nowrap",
].join(" ");
