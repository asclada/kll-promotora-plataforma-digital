/**
 * WhatsApp mark, redrawn so it carries the page's own stroke weight instead of
 * importing a brand-green button into a committed world. Recognition comes
 * from the glyph plus the word, not from the colour.
 */
export default function WhatsappGlyph({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M3.2 20.8 4.5 16.4A8.6 8.6 0 1 1 7.9 19.6l-4.7 1.2Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M9 8.1c.3-.1.6 0 .8.3l.8 1.4c.1.3.1.6-.1.8l-.5.6c-.1.2-.2.4 0 .7.4.7 1.4 1.7 2.1 2.1.3.2.5.1.7 0l.6-.5c.2-.2.5-.2.8-.1l1.4.8c.3.2.4.5.3.8-.2.7-.9 1.3-1.7 1.3-2.6 0-6.6-4-6.6-6.6 0-.8.6-1.4 1.4-1.6Z"
        fill="currentColor"
      />
    </svg>
  );
}
