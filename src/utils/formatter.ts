export function humanize(text: string): string {
  let result = text.replace(/_/g, ' ');
  result = result.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

  return result;
}