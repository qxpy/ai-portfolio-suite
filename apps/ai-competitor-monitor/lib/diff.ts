export function diffLines(previous: string, current: string) {
  const prev = new Set(previous.split(". ").map(s=>s.trim()).filter(Boolean));
  const curr = new Set(current.split(". ").map(s=>s.trim()).filter(Boolean));
  const added = [...curr].filter(l=>!prev.has(l)).slice(0, 8);
  const removed = [...prev].filter(l=>!curr.has(l)).slice(0, 8);
  return { added, removed, delta: added.length + removed.length };
}
