export interface CreateTicketDto {
  identification: string
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  description: string
  priority: 'low' | 'medium' | 'high'
}
