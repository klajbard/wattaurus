const TRUNCATE_LENGTH = 100;

export function truncate(string, truncate = TRUNCATE_LENGTH) {
  const stringText = string.text
    .replace(/\[(.*?)\]/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/<<(.*?)>>/g, "$1")
    .replace(/<(.*?)>/g, "")
    .replace(/(>)\s/g, "")
    .replace(/\((.*?)\)/g, "");
  if (stringText.length <= truncate) return stringText;
  const truncated = stringText.slice(0, truncate - 1).split(" ");
  return `${truncated.slice(0, -1).join(" ")}...`;
}

export function getReadTime(content) {
  const wordsCount = content.reduce((prev, curr) => {
    if (curr.text) {
      prev += curr.text.split(" ").length;
    }
    if (curr.code) {
      prev += curr.code.source.length / 10;
    }
    return prev;
  }, length);
  return Math.ceil(wordsCount / 180);
}
