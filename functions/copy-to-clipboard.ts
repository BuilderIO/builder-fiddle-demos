// Adopted from https://stackoverflow.com/a/30810322/1959717
function fallbackCopyTextToClipboard(text: string) {
  const textarea = document.createElement("textarea");
  textarea.textContent = text;
  document.body.appendChild(textarea);

  const selection = document.getSelection()!;
  const range = document.createRange();
  range.selectNode(textarea);
  selection.removeAllRanges();
  selection.addRange(range);

  let successful = false;
  try {
    successful = document.execCommand("copy");
    if (!successful) {
      console.warn("Uncable to copy to clipboard");
    }
  } catch (err) {
    console.warn("Uncable to copy to clipboard", err);
  }

  selection.removeAllRanges();
  document.body.removeChild(textarea);
  return successful;
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    fallbackCopyTextToClipboard(text);
  }
}
