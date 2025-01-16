# In.Orbit Front-End

Este é o lado do cliente do projeto In.Orbit, uma aplicação web usando [React](https://pt-br.legacy.reactjs.org/) que consulta dados do [Back-End através de uma API](https://github.com/Victor-Lis/In.Orbit-Back-End/) utilizando o [React Query](https://tanstack.com/query/latest/docs/framework/react/overview).

O projeto foi criado no evento NLW da [RocketSeat](https://github.com/Rocketseat) com nível intermediário, sob a tutoria de [Diego Fernandes](https://www.linkedin.com/in/diego-schell-fernandes/).

Abaixo, destaco alguns pontos importantes do projeto, seja por ser minha primeira experiência com eles ou por serem essenciais para o projeto.

<br>

## [@radix-ui](https://www.radix-ui.com/)

Sendo sincero, eu nem conhecia essa biblioteca e nunca fui um grande apoiador de bibliotecas que disponibilizam uma UI pré-pronta. Acredito que seja importante conseguir criar do zero sem depender de uma biblioteca assim, mas achei interessante trabalhar com ela pela primeira vez. Quem sabe um dia me aprofunde mais.

No projeto, foi disponibilizada uma pasta chamada "ui" com os componentes usando @radix-ui já criados:
```path
src/components/ui
```

### Instalação
```bash
npm install @radix-ui/react
```

### Exemplo de Componente
```path
src/components/ui/progress-bar.tsx
```
```tsx
import * as ProgressPrimitive from '@radix-ui/react-progress';

export function Progress(props: ProgressPrimitive.ProgressProps) {
  return (
    <ProgressPrimitive.Progress
      {...props}
      className="bg-zinc-900 rounded-full h-2"
    />
  );
}

export function ProgressIndicator(
  props: ProgressPrimitive.ProgressIndicatorProps
) {
  return (
    <ProgressPrimitive.Indicator
      {...props}
      className="bg-gradient-to-r from-pink-500 to-violet-500 w-1/2 h-2 rounded-full"
    />
  );
}
```

### Exemplo de Aplicação
```tsx
import { Progress, ProgressIndicator } from './ui/progress-bar';

export default function Summary() {
  const completedPercentage = 50; // Exemplo de valor

  return (
    <Progress value={8} max={15}>
      <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
    </Progress>
  );
}
```

<br>

## [React Query](https://tanstack.com/query/latest)

Nunca havia usado antes, mas definitivamente mudou minha perspectiva quanto a requisições HTTP usando React. Definitivamente não vou mais usar o bom e velho useEffect para isso.

### Instalação
```bash
npm install @tanstack/react-query
```

### Definindo o Provider
Para utilizar o React Query na nossa aplicação, precisamos implementar o provider no arquivo raiz que engloba os demais, no caso `main.tsx`:
```path
src/main.tsx
```
```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
```

### Exemplo - Realizando Requisição
O `useQuery` é muito mais eficiente que o método "nativo" por inúmeros motivos, principalmente porque é possível cancelar requisições, requisitar novamente ou definir um tempo entre a requisição atual e a próxima com muita facilidade, ganhando assim muito desempenho.

Abaixo, um exemplo de realização de uma requisição HTTP:
```path
src/components/summary.tsx
```
```tsx
import { useQuery } from '@tanstack/react-query';

export default function Summary() {
  const { data: summary } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  });

  if (!summary?.at(0)) {
    return null;
  }

  return (
    <h1>Todas as tarefas cadastradas: {summary[0].total}</h1>
  );
}
```

### Exemplo - Renovando Requisição
Para "cancelar" uma requisição antiga e renová-la é muito simples. Basta declarar um `useQueryClient` e utilizar o método `.invalidateQueries`. Abaixo, um exemplo de componente que usa o [useQuery](https://tanstack.com/query/latest/docs/framework/react/guides/queries) e o [useQueryClient](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation):
```path
src/components/pending-goals.tsx
```
```tsx
import { Plus } from 'lucide-react';
import { OutlineButton } from './ui/outline-button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPendingGoals } from '../http/get-pending-goals';
import { createGoalCompletion } from '../http/create-goal-completion';
import { deleteGoal } from '../http/delete-goal';

export default function PendingGoals() {
  const queryClient = useQueryClient();

  const { data: pendingGoals } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60,
  });

  if (!pendingGoals) {
    return null;
  }

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId);

    queryClient.invalidateQueries({ queryKey: ['summary'] });
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] });
  }

  async function handleDeleteGoal(goalId: string) {
    await deleteGoal(goalId);

    queryClient.invalidateQueries({ queryKey: ['summary'] });
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] });
  }

  return (
    <div className="flex flex-wrap gap-3">
      ```tsx
      {pendingGoals.map(goal => (
        <OutlineButton
          onClick={() => handleCompleteGoal(goal.id)}
          onDoubleClick={() => handleDeleteGoal(goal.id)}
          key={goal.id}
          disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
        >
          <Plus className="size-4 text-zinc-600" />
          {goal.title}
        </OutlineButton>
      ))}
      ```
    </div>
  );
}
```

<br>

## Resultado Final do Projeto
![Resultado Final](https://github.com/user-attachments/assets/cb45546f-88de-4c97-a723-a62caa3a5aae)

<br>

## Autores
- [@Victor-Lis](https://www.linkedin.com/in/victor-lis-bronzo/)
- [@Diego Fernandes](https://www.linkedin.com/in/diego-schell-fernandes/)
