export interface ElementProps {
  tag: keyof HTMLElementTagNameMap;
  classNames?: string[] | undefined;
  content?: string;
  attributes?: { [key: string]: string };
  event?: string;
  eventCallback?: (event: Event) => void;
  nameLength?: number;
  id?: string | undefined;
}
export interface Router {
  init: () => void;
  showPage: (hash: string) => void;
}
