export interface User {
  id: number
  username: string
  role: 'AGENT' | 'RESOLVER' | 'ADMIN'
}
