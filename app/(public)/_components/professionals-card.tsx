import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import type { ImageProps } from "next/image";
import Link from "next/link";
import type { LinkProps } from "next/link";

type ProfessionalsCardProps = {
  cardTitle: string;
  cardDescription: string;
  cardLink: LinkProps["href"];
  cardImage: ImageProps["src"];
  imageAlt: string;
};

export function ProfessionalsCard({
  cardTitle,
  cardDescription,
  cardLink,
  cardImage,
  imageAlt,
}: ProfessionalsCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-4">
        <div className="relative h-48">
          <Image
            src={cardImage}
            alt={imageAlt}
            fill
            sizes="(min-width: 1280px) 384px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 space-y-1 break-words">
              <h3 className="font-semibold">{cardTitle}</h3>
              <p className="text-sm text-muted-foreground">{cardDescription}</p>
            </div>
            <div
              aria-hidden="true"
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500"
            />
          </div>

          <Link
            href={cardLink}
            className="flex min-h-11 w-full items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 md:text-base"
            aria-label={`Ver detalhes de ${cardTitle}`}
          >
            Agendar Horario
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
