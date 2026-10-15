export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-100 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 text-center text-sm leading-relaxed text-zinc-600 sm:flex-row sm:justify-between sm:gap-6 sm:text-left lg:px-8">
        <p>&copy; {new Date().getFullYear()}. Todos os direitos reservados.</p>
        <p>
          Desenvolvido por{" "}
          <span className="font-medium text-zinc-700">@dev-thiagorosario</span>
        </p>
      </div>
    </footer>
  );
}
