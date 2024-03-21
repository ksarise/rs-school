export default function ClickCard(
  element: HTMLElement,
  source: HTMLElement,
  target: HTMLElement
) {
  element.addEventListener('click', () => {
    if (element.parentElement?.classList.contains('source-block')) {
      source.removeChild(element);
      target.appendChild(element);
    } else {
      target.removeChild(element);
      source.appendChild(element);
    }
  });
}
