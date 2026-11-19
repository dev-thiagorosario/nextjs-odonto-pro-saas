const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatServicePrice(price: string): string {
  return currencyFormatter.format(Number(price));
}

export function formatServiceDuration(minutes: number): string {

  const hours = Math.floor(minutes / 60);

  const remainder = minutes % 60;

  if (hours === 0) return `${minutes} min`;
  return remainder === 0 ? `${hours} h` : `${hours} h ${remainder} min`;
}
