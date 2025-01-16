# In.Orbit Front-End

https://github.com/user-attachments/assets/cb45546f-88de-4c97-a723-a62caa3a5aae

📋 Sobre o Projeto
Este é o front-end do In.Orbit, uma aplicação web moderna para gerenciamento de metas e hábitos desenvolvida com:

- ⚛️ [React](https://reactjs.org/docs/getting-started.html)
- 🔄 [React Query](https://react-query.tanstack.com/overview)
- 🎨 [Radix UI](https://www.radix-ui.com/docs/primitives/overview/introduction)

O projeto foi criado durante o NLW da [RocketSeat](https://www.rocketseat.com.br) 🎓

<br>

## [@radix-ui 🎨](https://www.radix-ui.com/)

Uma biblioteca de componentes UI prontos para uso que mantém alta acessibilidade e customização.

```javascript
import * as ProgressPrimitive from '@radix-ui/react-progress'

export function Progress(props: ProgressPrimitive.ProgressProps) {
  return (
    <ProgressPrimitive.Progress
      {...props}
      className="bg-zinc-900 rounded-full h-2"
    />
  )
}
```

<br>

## [React Query 🔄](https://tanstack.com/query/latest)

Gerenciamento de estado e cache para requisições HTTP de forma elegante:

```javascript
const { data: summary } = useQuery({
  queryKey: ['summary'],
  queryFn: getSummary,
  staleTime: 1000 * 60 // Cache de 1 minuto
})
```

<br>

## Ver mais
Esse é o [Back-End](https://github.com/Victor-Lis/In.Orbit-Back-End)

## Autores

| <img src="https://github.com/Victor-Lis.png" width="100" style="border-radius:50%"/> | <img src="https://github.com/diego3g.png" width="100" style="border-radius:50%"/> |
| --- | --- |
| Victor Lis | Diego Fernandes |
| Desenvolvedor | Instrutor |

⭐ Se este projeto te ajudou, considere dar uma estrela!
