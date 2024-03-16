import BaseComponentGenerator from './base-component';

export const header = new BaseComponentGenerator({
  tag: 'header',
  className: 'header',
  content: 'header',
});
export const section = new BaseComponentGenerator({
  tag: 'section',
  className: 'section',
  content: 'section',
});
export const main = new BaseComponentGenerator({
  tag: 'main',
  className: 'main',
  content: 'main',
});
export const div = new BaseComponentGenerator({ tag: 'div', content: 'div' });
export const h1 = new BaseComponentGenerator({ tag: 'h1', content: 'h1' });
export const form = new BaseComponentGenerator({ tag: 'form', content: 'h1' });
export const label = new BaseComponentGenerator({
  tag: 'label',
  content: 'label',
});
export const input = new BaseComponentGenerator({ tag: 'input' });
export const img = new BaseComponentGenerator({ tag: 'img' });
export const button = new BaseComponentGenerator({ tag: 'button' });
