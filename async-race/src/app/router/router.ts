import { Router } from '../types/types';

export default function createRouter(): Router {
  function showPage(hash: string): void {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page) => {
      (page as HTMLElement).classList.add('hidden');
    });
    const targetPage = document.querySelector(hash);
    if (targetPage) {
      (targetPage as HTMLElement).classList.remove('hidden');
    }
  }
  function init(): void {
    showPage(document.location.hash || '#garage');
    window.addEventListener('hashchange', () => {
      showPage(document.location.hash);
    });
  }

  return {
    init,
    showPage,
  };
}
