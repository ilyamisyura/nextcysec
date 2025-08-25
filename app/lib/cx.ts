export function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

