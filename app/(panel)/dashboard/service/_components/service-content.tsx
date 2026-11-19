import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllServices } from "../_data-access/get-all-service";
import { ServicesList } from "./services-list";
import { ServicesRetry } from "./services-retry";

export async function ServiceContent() {
  const result = await getAllServices();

  if (!result.success) {
    return (
      <section className="mx-auto w-full max-w-4xl" aria-label="Serviços">
        <Card>
          <CardHeader>
            <CardTitle><h1>Serviços</h1></CardTitle>
            <CardDescription>Consulte os procedimentos disponíveis na sua clínica.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p role="alert" className="text-sm text-destructive">{result.error}</p>
            <ServicesRetry />
          </CardContent>
        </Card>
      </section>
    );
  }

  return <ServicesList services={result.data} />;
}
