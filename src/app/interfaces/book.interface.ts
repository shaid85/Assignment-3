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
  // For bulk import
  createdAt?: String | Date // Optional, automatically managed by the database
  updatedAt?: String | Date // Optional, automatically managed by the database
}

// interface/book.interface.ts
export interface StaticBookModel extends mongoose.Model<Book> {
  checkAndUpdateAvailability(bookId: string): Promise<void>
}
