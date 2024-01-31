export function generateElement(
  tag,
  className,
  parent,
  text
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
  return element;
}