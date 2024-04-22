export interface ElementProps {
  tag: keyof HTMLElementTagNameMap;
  className?: string | undefined;
  content?: string;
  attributes?: { [key: string]: string };
  event?: string;
  type?: string;
  eventCallback?: (event: Event) => void;
  nameLength?: number;
}
export type Routes = { [key: string]: () => void };
