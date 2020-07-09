export default (content, maxLength = 150) => {
  if (content.length < 1) return "Error";
  if (content.length <= maxLength) return content;
  const shortenText = content.substr(0, content.lastIndexOf(" ", maxLength));
  if (shortenText.slice(-1) === "." || shortenText.slice(-1) === ",") {
    return shortenText.substring(0, shortenText.length - 1) + "...";
  } else {
    return shortenText + "...";
  }
};
