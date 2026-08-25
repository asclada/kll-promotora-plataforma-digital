import type { ReactNode } from "react";

/**
 * Section titles sit on a ruled row, the way a heading sits on a printed form.
 * The rule is the only ornament this page allows itself.
 */
export default function SectionHeading({
  as: Tag = "h2",
  children,
  lead,
  tone = "ink",
  id,
}: {
  as?: "h2" | "h3";
  children: ReactNode;
  lead?: ReactNode;
  tone?: "ink" | "paper";
  id?: string;
}) {
  const ruleClass = tone === "paper" ? "border-rule-ink" : "border-rule-strong";
  const leadClass = tone === "paper" ? "text-white/80" : "text-ink-2";

  return (
    <div className={`border-b ${ruleClass} pb-5`}>
      <Tag
        id={id}
        className="font-display text-3xl font-black md:text-4xl"
      >
        {children}
      </Tag>
      {lead && (
        <p className={`measure mt-4 text-lg ${leadClass}`}>{lead}</p>
      )}
    </div>
  );
}
