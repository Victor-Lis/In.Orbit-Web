import type { SummaryType } from '../@types/SummaryType'

export async function getSummary(): Promise<SummaryType[]> {
  const res = await fetch('http://localhost:3333/summary')
  const data = await res.json()

  return data.summary
}
