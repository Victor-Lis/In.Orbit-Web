# In.Orbit — Front-End

Interface web do In.Orbit, aplicação de gerenciamento de metas e hábitos semanais. Consome a API do [In.Orbit Back-End](https://github.com/Victor-Lis/In.Orbit-Back-End) para criar metas, registrar conclusões e exibir o resumo de progresso da semana.

Projeto desenvolvido durante o NLW da [RocketSeat](https://www.rocketseat.com.br), construído com React, TanStack Query para cache/estado de requisições e Radix UI como base de componentes acessíveis.

## Stack

- [React](https://reactjs.org/) 18 + [Vite](https://vitejs.dev/)
- [TanStack Query](https://tanstack.com/query/latest) para busca e cache de dados
- [Radix UI](https://www.radix-ui.com/) (Dialog, Progress, Radio Group) como base dos componentes
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) para formulários e validação
- Tailwind CSS

## Arquitetura

```
src/
├── @types/        # Tipos das entidades (Goals, Summary)
├── components/    # Componentes de tela (create-goal, pending-goals, summary...)
│   └── ui/        # Componentes de base (button, dialog, input, progress-bar...)
├── http/          # Funções de acesso à API (fetch)
├── app.tsx        # Componente raiz
└── main.tsx       # Entry point
```

As funções em `src/http/` apontam diretamente para `http://localhost:3333`, o endereço padrão do back-end em desenvolvimento local — não há variáveis de ambiente configuráveis no projeto.

## Pré-requisitos

- Node.js compatível com Vite 5 / React 18
- O [In.Orbit Back-End](https://github.com/Victor-Lis/In.Orbit-Back-End) rodando em `http://localhost:3333`

## Instalação e execução

```bash
npm install
npm run dev       # ambiente de desenvolvimento (Vite)
```

## Build de produção

```bash
npm run build     # tsc -b && vite build
npm run preview   # serve o build gerado localmente
```

## Lint

```bash
npm run lint
```

## Testes

Não há testes automatizados configurados no projeto atualmente.

## Licença

Ver o arquivo `LICENSE` no repositório.
