import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ServicesLoading() {
  return (
    <div className="mx-auto w-full max-w-4xl" role="status" aria-busy="true">
      <Card>
        <CardHeader>
          <CardTitle>Serviços</CardTitle>
          <p className="text-sm text-muted-foreground">Carregando serviços...</p>
        </CardHeader>
        <CardContent className="space-y-3" aria-hidden="true">
          {[0, 1, 2].map((item) => <div key={item} className="h-24 rounded-lg bg-muted motion-safe:animate-pulse" />)}
        </CardContent>
      </Card>
    </div>
  );
}
