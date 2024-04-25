import RequestTypes from './requests';

export interface ElementProps {
  tag: keyof HTMLElementTagNameMap;
  classNames?: string[] | undefined;
  content?: string;
  attributes?: { [key: string]: string };
  event?: string;
  type?: string;
  eventCallback?: (event: Event) => void;
  nameLength?: number;
}
export type Routes = { [key: string]: () => void };
export interface ResponseData {
  id: string;
  type: RequestTypes;
  payload: {
    error?: string;
    user?: {
      login: string;
      isLogined: boolean;
    };
  };
}
export interface MessageHistory {
  id: string;
  type: RequestTypes.MSG_FROM_USER | RequestTypes.MSG_SEND;
  payload: {
    messages: Message[];
  };
}
export interface MessageRead {
  id: string;
  type: RequestTypes.MSG_READED | RequestTypes.MSG_DELETED_FROM_SERVER;
  payload: {
    message: {
      id: string;
    };
  };
}
export interface MessageEdit {
  id: string;
  type: RequestTypes.MSG_EDIT;
  payload: {
    message: {
      id: string;
      text: string;
      status: {
        isEdited: boolean;
      };
    };
  };
}
export interface MessageSend {
  id: string;
  type: RequestTypes.MSG_SEND;
  payload: {
    message: Message;
  };
}
export interface Message {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
}
