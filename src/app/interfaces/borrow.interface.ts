/**
 * This file is part of the Book Lending System.
 * It defines the Borrow interface used to represent a book borrowing transaction.
 */
import mongoose, { Model, Types } from 'mongoose'

export interface BorrowCreate {
  book: Types.ObjectId // Mandatory
  quantity: number // Mandatory
  dueDate: Date // Mandatory
}

export interface BorrowModel extends Model<BorrowCreate> {
  getBorrowedBooksSummary: () => Promise<
    {
      book: {
        title: string
        isbn: string
      }
      totalQuantity: number
    }[]
  >
}
