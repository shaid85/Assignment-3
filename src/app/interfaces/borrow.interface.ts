/**
 * Borrow interface
 */
import { Model, Types } from 'mongoose'

export interface BorrowCreate {
  book: Types.ObjectId // Mandatory
  quantity: number // Mandatory
  dueDate: Date // Mandatory
}
