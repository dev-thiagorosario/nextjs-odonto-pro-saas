import { ClipboardList, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ServiceListProps } from "../_queries/list-services";
import { DialogService } from "./dialog-service";
import { ServiceAvailability } from "./service-availability";
import { formatServiceDuration, formatServicePrice } from "./service-format";



export function ServicesList({ services }: ServiceListProps) {
  return (
    <section className="mx-auto w-full max-w-4xl" aria-labelledby="services-title">
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle><h1 id="services-title">Serviços</h1></CardTitle>
            <CardDescription>Consulte os procedimentos da sua clínica, seus valores e durações.</CardDescription>
          </div>
          <DialogService />
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed px-4 py-12 text-center">
              <ClipboardList className="size-8 text-muted-foreground" aria-hidden="true" />
              <h2 className="font-medium">Nenhum serviço cadastrado</h2>
              <p className="max-w-sm text-sm text-muted-foreground">Os procedimentos da sua clínica aparecerão aqui com seus valores e durações.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{services.length} {services.length === 1 ? "serviço cadastrado" : "serviços cadastrados"}</p>
              <ul className="divide-y rounded-lg border">
                {services.map((service) => (
                  <li key={service.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="min-w-0 break-words font-medium">{service.name}</h2>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-sm text-muted-foreground">
                          {service.status ? "Ativo" : "Inativo"}
                        </span>
                      </div>
                      <dl className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                        <div>
                          <dt className="sr-only">Valor</dt>
                          <dd className="font-medium text-foreground">{formatServicePrice(service.price)}</dd>
                        </div>
                        <div>
                          <dt className="sr-only">Duração</dt>
                          <dd className="flex items-center gap-1.5"><Clock className="size-4" aria-hidden="true" />{formatServiceDuration(service.duration)}</dd>
                        </div>
                      </dl>
                    </div>
                    <div className="flex flex-wrap items-start gap-2">
                      {service.status && <DialogService service={service} />}
                      <ServiceAvailability service={service} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
