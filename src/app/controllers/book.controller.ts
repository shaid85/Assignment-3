/**
 * Controller : BookController
 * This controller handles the business logic for book-related operations like: borrowed books returning.
 */
import express, { NextFunction, Request, Response } from 'express'
import BookModel from '../models/book.model'
import mongoose from 'mongoose'

export const bookRoutes = express.Router()

/**
 * Create Borrow entry
 */
bookRoutes.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body
      const createdBook = await BookModel.create(body)
      // Move `_id` to the top
      const { _id, ...rest } = createdBook.toObject()

      res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: {
          _id,
          ...rest,
        },
      })
    } catch (error) {
      next(error) // Pass to custom error handler
    }
  }
)

/**
 * Get all books with optional filters, sorting, and limit
 */
bookRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      filter,
      sortBy = 'createdAt',
      sort = 'asc',
      limit = '10',
    } = req.query

    const query = filter
      ? { genre: new RegExp(`^${filter}$`, 'i') } // case-insensitive match
      : {}

    const data = await BookModel.find(query)
      .sort({ [sortBy as string]: sort === 'desc' ? -1 : 1 })
      .limit(parseInt(limit as string, 10))

    // If filter was applied but no results found
    if (filter && data.length === 0) {
      const error = new Error(`No books found for genre '${filter}'`)
      ;(error as any).status = 404
      return next(error)
    }

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      // Extra added: Count of books returned
      Book_Show: data.length,
      data,
    })
  } catch (error) {
    next(error) // Pass to custom error handler
  }
})

bookRoutes.get(
  '/:bookId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params

      // Treat invalid IDs the same as not found
      if (!mongoose.Types.ObjectId.isValid(req.params.bookId)) {
        const error = new Error('invalid ID')
        ;(error as any).status = 404
        return next(error)
      }

      const data = await BookModel.findOne({ _id: bookId })
      if (!data) {
        const error = new Error('Book not found')
        ;(error as any).status = 404
        return next(error)
      }

      res.status(200).json({
        success: true,
        message: 'Book retrieved successfully',
        data,
      })
    } catch (error) {
      next(error)
    }
  }
)

bookRoutes.patch(
  '/:bookId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Treat invalid IDs the same as not found
      if (!mongoose.Types.ObjectId.isValid(req.params.bookId)) {
        const error = new Error('invalid ID')
        ;(error as any).status = 404
        return next(error)
      }

      const data = await BookModel.findByIdAndUpdate(
        req.params.bookId,
        req.body,
        { new: true, runValidators: true }
      )

      if (!data) {
        const error = new Error('Book not found')
        ;(error as any).status = 404
        return next(error)
      }

      res.status(200).json({
        success: true,
        message: 'Book updated successfully',
        data,
      })
    } catch (error) {
      next(error)
    }
  }
)

bookRoutes.delete(
  '/:bookId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Treat invalid IDs the same as not found
      if (!mongoose.Types.ObjectId.isValid(req.params.bookId)) {
        const error = new Error('invalid ID')
        ;(error as any).status = 404
        return next(error)
      }

      const { bookId } = req.params
      // Treat invalid IDs the same as not found
      if (!mongoose.Types.ObjectId.isValid(req.params.bookId)) {
        const error = new Error('invalid ID')
        ;(error as any).status = 404
        return next(error)
      }
      const data = await BookModel.deleteOne({ _id: bookId })

      if (data.deletedCount === 0) {
        const err: any = new Error('Book not found')
        err.status = 404
        return next(err)
      }

      res.status(200).json({
        success: true,
        message: 'Book deleted successfully',
        data,
      })
    } catch (error) {
      next(error)
    }
  }
)
