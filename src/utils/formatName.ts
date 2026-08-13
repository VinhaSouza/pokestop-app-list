export function formatName(name: string) {
    if (!name) return ' ';

    return name.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}
