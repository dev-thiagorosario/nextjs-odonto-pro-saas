"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { serviceSchema, type ServiceFormData } from "../_schemas/service-schema";
import type { ServiceListItem } from "../_types/service";

export function useDialogServiceForm(service?: ServiceListItem) {
  return useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    mode: "onBlur",
    defaultValues: {
      name: service?.name ?? "",
      price: service?.price.replace(".", ",") ?? "",
      duration: service?.duration,
    }
  });
}
