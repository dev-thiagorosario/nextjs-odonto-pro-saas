# OdontoPRO

Aplicação Next.js com PostgreSQL 17 hospedado em um container Docker e acesso ao banco pelo Prisma 7, usando o adapter `pg`.

## Executar localmente

Requisitos: Node.js 22.12+ (ou 24), npm, Docker Engine e Docker Compose v2.

1. Copie `.env.example` para `.env` e configure uma senha. Mantenha `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` e `POSTGRES_PORT` em sincronia com `DATABASE_URL`. Caracteres especiais na senha precisam de URL encoding na URL.
2. Execute `npm install` (também gera o Prisma Client).
3. Execute `npm run db:up` para iniciar o banco e aguardar sua disponibilidade.
4. Execute `npm run db:check` para testar uma consulta pelo Prisma.
5. Execute `npm run dev` e acesse http://localhost:3000.

O `.env` local não é versionado. Na configuração inicial deste projeto, ele foi criado com uma senha aleatória.

## Banco de dados

Somente o PostgreSQL roda no Docker. O Next.js roda no host e conecta em `localhost:5432`, por padrão. A porta publicada fica restrita a `127.0.0.1`. Os dados ficam no volume `postgres_data`, preservado ao parar ou recriar o container. O banco inicial é `odonto_pro`.

| Comando | Finalidade |
| --- | --- |
| `npm run db:up` | Iniciar PostgreSQL e aguardar o healthcheck |
| `npm run db:stop` | Parar o banco preservando os dados |
| `npm run db:logs` | Acompanhar logs do PostgreSQL |
| `npm run db:check` | Consultar nome e versão do banco pelo Prisma |
| `npm run db:validate` | Validar o schema |
| `npm run db:generate` | Gerar o Prisma Client |
| `npm run db:migrate -- --name nome_da_migracao` | Criar e aplicar uma migração no desenvolvimento |
| `npm run db:deploy` | Aplicar migrações versionadas no ambiente de hospedagem |
| `npm run db:studio` | Abrir o Prisma Studio |

As credenciais do Compose são usadas na primeira inicialização do volume. Alterar o `.env` depois disso não altera automaticamente o usuário ou a senha no PostgreSQL. `docker compose down -v` apaga os dados; não o utilize para simplesmente parar o banco.

## Prisma na aplicação

O schema está em `prisma/schema.prisma` e a configuração da CLI em `prisma7.config.ts`, seguindo a convenção do Prisma 7.10. O cliente é gerado em `generated/prisma` e não é versionado. Depois de alterar o schema, execute a migração e `npm run db:generate`.

Importe `prisma` de `@/lib/prisma` em Server Components, Server Actions ou Route Handlers no runtime Node.js. O módulo é protegido por `server-only` e reutiliza a instância durante o hot reload no desenvolvimento.

O schema ainda não possui modelos ou migrações: as entidades serão definidas conforme as funcionalidades da aplicação forem implementadas. O teste de conexão usa uma consulta SQL pelo Prisma e funciona sem tabelas.

## Hospedagem

O Compose pode ser executado em um servidor com armazenamento persistente. Configure as variáveis nesse servidor, gere o cliente durante a instalação/build e aplique as migrações com `npm run db:deploy` quando existirem.

Se o Next.js também passar a rodar em um container na mesma rede Docker, use `postgres:5432` como host na `DATABASE_URL` da aplicação. No host, continue usando `localhost` e a porta publicada. A configuração atual foi iniciada nesta máquina; nenhum servidor remoto foi provisionado. O volume mantém os dados entre reinicializações, mas backups devem ser configurados separadamente para produção.

Referências: [Prisma com adapters de banco](https://www.prisma.io/docs/orm/v7/core-concepts/supported-databases/database-drivers) e [imagem oficial do PostgreSQL](https://hub.docker.com/_/postgres).
