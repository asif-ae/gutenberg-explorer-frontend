export default function kebabToCamelCase(str: string): string {
  return str.replace(/-./g, (match) => match[1].toUpperCase());
}
