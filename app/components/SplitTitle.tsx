/** Big headline whose letters rise in, line by line (CSS only; see `.big` in globals.css). */
export default function SplitTitle({
  lines,
  id,
  label,
}: {
  lines: string[];
  id?: string;
  /** accessible name; defaults to the visible text */
  label?: string;
}) {
  return (
    <h1 className="big" id={id} aria-label={label ?? lines.join(" ")}>
      {lines.map((line, li) => (
        <span className="w" key={li} aria-hidden="true">
          {[...line].map((ch, ci) => (
            <span className="c" key={ci} style={{ "--d": `${(li * 6 + ci) * 40}ms` } as React.CSSProperties}>
              {ch === " " ? " " : ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}


export { toLines } from "../lib/text";
