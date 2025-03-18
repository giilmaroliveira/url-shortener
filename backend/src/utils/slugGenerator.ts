import { nanoid } from "nanoid";

export const generateSlug = (): string => nanoid(6);
