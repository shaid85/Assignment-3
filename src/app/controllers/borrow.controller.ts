/**
 * Controller : BorrowController
 * This controller handles the business logic for book-borrow operations.
 */
import express, { NextFunction, Request, Response } from 'express'
import BookModel from '../models/book.model'
import BorrowModel from '../models/borrow.model'
import mongoose from 'mongoose'

export const borrowRoutes = express.Router()

/**
 * Borrow a book
 */
borrowRoutes.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { book: bookId, quantity: borrowQty, dueDate } = req.body

      // Treat invalid IDs the same as not found
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        const error = new Error('invalid ID')
        ;(error as any).status = 404
        return next(error)
      }

      const book = await BookModel.findById(bookId)
      if (!book) {
        const error = new Error('Book not found')
        ;(error as any).status = 404
        return next(error)
      }

      if (book.copies < borrowQty) {
        const error = new Error(`Only ${book.copies} copies available`)
        ;(error as any).status = 400
        return next(error)
      }

      // 3. Create borrow record
      const borrowRecord = new BorrowModel({
        book: bookId,
        quantity: borrowQty,
        dueDate,
      })
      await borrowRecord.save()

      // 4. Update book copies and availability by static method
      await BookModel.checkAndUpdateAvailability(bookId)

      // Return response with custom order
      const { _id, ...rest } = borrowRecord.toObject()

      res.status(201).json({
        success: true,
        message: 'Book borrowed successfully',
        data: {
          _id,
          ...rest,
        },
      })
    } catch (error) {
      next(error)
    }
  }
)

/** * Get borrowed books summary (use aggregate)
 */
borrowRoutes.get('/', async (req, res, next) => {
  try {
    const summary = await BorrowModel.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'book',
        },
      },
      { $unwind: '$book' },
      {
        $project: {
          _id: 0,
          book: {
            title: '$book.title',
            isbn: '$book.isbn',
          },
          totalQuantity: 1,
        },
      },
    ])

    if (summary.length === 0) {
      res.status(200).json({
        success: true,
        message: 'No borrowed books found',
        data: [],
      })
    } else {
      // Reorder response manually
      const orderedSummary = summary.map((item) => ({
        book: item.book,
        totalQuantity: item.totalQuantity,
      }))

      res.status(200).json({
        success: true,
        message: 'Book borrowed successfully',
        data: orderedSummary,
      })
    }
  } catch (error) {
    next(error)
  }
})
