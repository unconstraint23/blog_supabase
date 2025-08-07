export function formatDate(dateString: string): string {
  const date = new Date(dateString || '2025-01-01')

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}