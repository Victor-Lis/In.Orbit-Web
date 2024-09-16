export type SummaryType = {
  completed: number
  total: number
  goalsPerDay: {
    [date: string]: GoalType[]
  }
}

export type GoalType = {
  id: string
  title: string
  completedAt: string
}
