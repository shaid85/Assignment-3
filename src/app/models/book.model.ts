/**
 * Book model structure and validation.
 */

import { model, Schema } from 'mongoose'
import { Book } from '../interfaces/book.interface'
import { StaticBookModel } from '../interfaces/book.interface'

// Define the schema for the Book model
const bookSchema = new Schema<Book>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      enum: [
        'FICTION',
        'NON_FICTION',
        'SCIENCE',
        'HISTORY',
        'BIOGRAPHY',
        'FANTASY',
      ],
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
    },
    description: { type: String, default: '' },
    copies: {
      type: Number,
      required: true,
      min: [0, 'Copies must be a positive number'],
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    versionKey: false, // Disable the __v field
  }
)

// Static method: update availability if copies are 0
bookSchema.statics.checkAndUpdateAvailability = async function (
  bookId: string
) {
  const book = await this.findById(bookId)
  if (!book) return
  if (book.copies <= 0 && book.available === true) {
    book.available = false
    await book.save()
  }
}

// Extra try - book returns then update availability
// pre-save middleware
bookSchema.pre('findOneAndUpdate', function (next) {
  const update: any = this.getUpdate()

  const newCopies =
    update?.copies !== undefined ? update.copies : update?.$set?.copies

  if (typeof newCopies === 'number') {
    const available = newCopies > 0

    // Ensure $set exists and update it directly
    if (!update.$set) update.$set = {}
    update.$set.available = available

    this.setUpdate(update)
  }

  next()
})

// Create the Book model using the defined schema
const BookModel = model<Book, StaticBookModel>('Book', bookSchema)

// Export the Book model
export default BookModel

// Export the schema
export { bookSchema }
