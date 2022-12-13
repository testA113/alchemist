import type { StrapiError } from "../utils.server";

export type ContactMessage = {
  name: string;
  email: string;
  description: string;
};

export type ContactMessagePayload = {
  data: ContactMessage;
};

export type StrapiContactMessageResponse = {
  data: ContactMessage | null;
  error: StrapiError<keyof ContactMessage> | null;
};

export type ContactMessageActionData =
  | {
      error: Record<keyof ContactMessage, string>;
      values: ContactMessage;
    }
  | undefined;
