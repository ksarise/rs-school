export interface ElementProps {
  tag: keyof HTMLElementTagNameMap;
  className?: string | undefined;
  content?: string;
  attributes?: { [key: string]: string };
}
