import { Plus } from "lucide-react";
import { faq } from "@/lib/content";

/**
 * Native <details>: keyboard, screen readers and in-page find all work
 * without a line of JavaScript, which matters more here than a custom
 * animation would.
 */
export default function FaqList({ items = faq }: { items?: typeof faq }) {
  return (
    <div className="border-t border-rule-strong">
      {items.map((item) => (
        <details
          key={item.q}
          name="faq"
          className="group border-b border-rule-strong"
        >
          <summary className="flex cursor-pointer list-none items-start gap-4 py-5 pr-1 font-display text-lg font-bold transition-colors duration-150 hover:text-indigo md:text-xl">
            <Plus
              className="mt-1 size-5 shrink-0 text-indigo transition-transform duration-300 ease-out-expo group-open:rotate-45"
              aria-hidden="true"
            />
            <span className="flex-1">{item.q}</span>
          </summary>
          <p className="measure pt-1 pb-6 pl-9 text-lg text-ink-2">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
