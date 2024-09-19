# In.Orbit Front-End

Esse é o lado do cliente do projeto in.orbit, ele é uma aplicação web usando [React](https://pt-br.legacy.reactjs.org/) que consulta dados do [Back-End através de uma API](https://github.com/Victor-Lis/In.Orbit-Back-End/) utilizando o [React Query](https://tanstack.com/query/latest/docs/framework/react/overview)

O projeto foi criado no evento NLW da [RocketSeat](https://github.com/Rocketseat) com nível intermediário com tutoria do [Diego Fernandes](https://www.linkedin.com/in/diego-schell-fernandes/).

Abaixo vou dar destaque a alguns pontos que para mim foram destaque do projeto, ou por ser minha primeira experiência usando ou por ser chave no projeto.

## [@radix-ui](https://www.radix-ui.com/)
Sendo sincero, nem conhecia essa lib e também nunca fui um grande apoiador dessas libs que disponibilizam uma UI pré-pronta. 

Isso porque acredito que seja importante conseguir criar do 0 sem ser dependende de uma lib assim, mas achei muito interessante trabalhar com uma lib dessa pela primeira vez, quem sabe um dia me aprofunde.

No caso nos foi disponibilizado uma pasta chamada "ui" com os componentes usando @radix-ui já criados
```path
  src/components/ui
```

### Instalação
```cmd
  npm i @radix ui
```

### Exemplo de componente
```path
  src/components/ui/progress-bar.tsx
```
```tsx
import * as ProgressPrimitive from '@radix-ui/react-progress'

export function Progress(props: ProgressPrimitive.ProgressProps) {
  return (
    <ProgressPrimitive.Progress
      {...props}
      className="bg-zinc-900 rounded-full h-2"
    />
  )
}

export function ProgressIndicator(
  props: ProgressPrimitive.ProgressIndicatorProps
) {
  return (
    <ProgressPrimitive.Indicator
      {...props}
      className="bg-gradient-to-r from-pink-500 to-violet-500 w-1/2 h-2 rounded-full"
    />
  )
}
```

### Exemplo de aplicação
```tsx
{/* Restante dos imports */}
import { Progress, ProgressIndicator } from './ui/progress-bar'

export default function Summary() {
  {/* Restante das operações */}
  return (
    {/* Outros componentes acima */}
     <Progress value={8} max={15}>
      {/* completedPercentage => Variável númerica */}
       <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
     </Progress>
    {/* Outros componentes abaixo */}
  )
}
```

## [React Query](https://tanstack.com/query/latest)
Nunca havia usado antes, mas defitivamente mudou minhas perspectiva quanto a requisições http usando React, definitivamente não vou mais usar o bom e velho useEffect para isso...

### Instalação
```cmd
  npm i @tanstack/react-query
```

### Definindo provider
Para podermos utilizar o React Query na nossa aplicação precisamos implementar nosso provider no arquivo raiz que engloba os demais, no caso main.tsx
```path
  src/main.tsx
```
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
```

### Exemplo - Realizando requisição
O useQuery é muito mais eficiente que o método "nativo" por inumeros motivos, mas principalmente pois é possivel cancelar requisições, requisitar novamente ou definir um tempo entre a requisição atual ou a próxima com muita facilidade, assim ganhando muito desempenho.

Abaixo deixo um exemplo da realização de uma requisição http:
```path
  src/components/summary.tsx
```
```tsx
import { useQuery } from '@tanstack/react-query'

export default function Summary() {
  const { data: summary } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  })

  if (!summary?.at(0)) {
    return null
  }

  return (
    <h1>Todas as tarefas cadastradas: {summary[0].total}</h1>
  )
}
```

### Exemplo - Renovando requisição
Para "cancelar" uma requisição antiga e renova-lá é muito tranquilo, basta declarar um "useQueryClient" e utilizar o método ".invalidateQueries", deixo abaixo um exemplo de componente que usa o [useQuery](https://tanstack.com/query/latest/docs/framework/react/guides/queries) e o [useQueryClient](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation)
```path
  src/components/pending-goals.tsx
```
```tsx
import { Plus } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPendingGoals } from '../http/get-pending-goals'
import { createGoalCompletion } from '../http/create-goal-completion'
import { deleteGoal } from '../http/delete-goal'

export default function PendingGoals() {
  const queryClient = useQueryClient()

  const { data: pendingGoals } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60,
  })

  if (!pendingGoals) {
    return null
  }

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  async function handleDeleteGoal(goalId: string) {
    await deleteGoal(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {pendingGoals.map(goal => {
        return (
          <OutlineButton
            onClick={() => handleCompleteGoal(goal.id)}
            onDoubleClick={() => handleDeleteGoal(goal.id)}
            key={goal.id}
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
```

## Resultado Final do Projeto
https://github.com/user-attachments/assets/cb45546f-88de-4c97-a723-a62caa3a5aae

# Autores
- [@Victor-Lis](https://www.linkedin.com/in/victor-lis-bronzo/)
- [@Diego Fernandes](https://www.linkedin.com/in/diego-schell-fernandes/)
