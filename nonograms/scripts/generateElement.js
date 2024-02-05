export function generateElement(
  tag,
  className,
  parent,
  text,
  id,
  type,
  labelFor
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

  if (id) {
    element.setAttribute('id', id);
  }

  if (type) {
    element.setAttribute('type', type);
  }
  
  if (labelFor) {
    element.setAttribute('for', labelFor);
  }
  return element;
}