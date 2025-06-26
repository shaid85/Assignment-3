import mongoose from 'mongoose'

// Book interface
export interface Book {
  title: string // Mandatory
  author: string // Mandatory
  genre:
    | 'FICTION'
    | 'NON_FICTION'
    | 'SCIENCE'
    | 'HISTORY'
    | 'BIOGRAPHY'
    | 'FANTASY' // Mandatory
  isbn: string // Mandatory and unique
  description?: string // Optional
  copies: number // Mandatory
  available?: boolean // Defaults true
}

// interface/book.interface.ts
export interface StaticBookModel extends mongoose.Model<Book> {
  checkAndUpdateAvailability(bookId: string): Promise<void>
}
