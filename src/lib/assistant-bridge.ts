"use client";

/**
 * Same-page bridge between any "Simular" button and the assistant card in
 * the hero. A plain module-level pub/sub — the two sides never share a
 * parent component, so this is simpler than threading a context through
 * every page that has a "Simular" button.
 *
 * Cross-page triggers (a button on /servicos, which isn't the hero's page)
 * can't use this: nothing is subscribed yet when the click happens, because
 * the assistant card hasn't mounted. Those use the `?assistente=1` query
 * param instead — AssistantCard reads it once on mount.
 */

type Listener = () => void;

let listeners: Listener[] = [];

export function subscribeAssistantOpen(fn: Listener): () => void {
  listeners = [...listeners, fn];
  return () => {
    listeners = listeners.filter((listener) => listener !== fn);
  };
}

export function requestAssistantOpen(): void {
  listeners.forEach((fn) => fn());
}
