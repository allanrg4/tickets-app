export interface User {
  id: number
  username: string
  role: 'agent' | 'resolver' | 'admin'
}
