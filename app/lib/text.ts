/** Splits a title into lines of at most `max` characters, keeping words whole. */
export function toLines(title: string, max = 12): string[] {
  return title.split(" ").reduce<string[]>((acc, word) => {
    const last = acc[acc.length - 1];
    if (last && `${last} ${word}`.length <= max) acc[acc.length - 1] = `${last} ${word}`;
    else acc.push(word);
    return acc;
  }, []);
}
