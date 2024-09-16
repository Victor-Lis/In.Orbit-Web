export async function deleteGoalCompletion(id: string) {
  await fetch('http://localhost:3333/completion', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      completionId: id,
    }),
  })
}
