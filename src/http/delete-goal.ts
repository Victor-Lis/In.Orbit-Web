export async function deleteGoal(id: string) {
  await fetch('http://localhost:3333/goal', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalId: id,
    }),
  })
}
