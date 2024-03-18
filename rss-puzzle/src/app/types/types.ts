export interface ElementProps {
  tag: keyof HTMLElementTagNameMap;
  className?: string | undefined;
  content?: string;
  attributes?: { [key: string]: string };
  event?: string;
  eventCallback?: (event: Event) => void;
  nameLength?: number;
}
