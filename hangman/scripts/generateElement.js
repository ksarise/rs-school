export function generateElement(
  tag,
  className,
  parent,
  text,
  src,
  href,
  alt
) {
  const element = document.createElement(tag);

  if (className) {
    element.classList.add(className);
  }
  
  if (parent) {
    parent.appendChild(element);
  }

  if (text) {
    if (typeof text === "string") {
      element.appendChild(document.createTextNode(text));
    }
  }

  if (src) {
    element.src = src;
  }
  if (href) {
    element.setAttribute("href", href);
    element.setAttribute("target", "_blank");
  }
  if (alt) {
    element.setAttribute("alt", alt);
  }
  return element;
}