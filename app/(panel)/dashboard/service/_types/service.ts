import type { Service } from "@/generated/prisma/client";

/** Minimal service data sent to the UI; price preserves decimal precision. */
export type ServiceListItem = Pick<Service, "id" | "name" | "duration" | "status"> & {
  price: string;
};
