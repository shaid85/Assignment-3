import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'field'
    const value = err.keyValue?.[field]

    return res.status(400).json({
      message: `${field} "${value}" already exists`,
      success: false,
      error: {
        name: err.name,
        field,
        value,
        errorLabelSet: err.errorLabels || {},
        errorResponse: err,
      },
    })
  }

  // Handle validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: {
        name: err.name,
        errors: Object.fromEntries(
          Object.entries(err.errors).map(([key, val]) => [
            key,
            {
              message: val.message,
              name: val.name,
              properties: 'properties' in val ? val.properties : undefined,
              kind: val.kind,
              path: val.path,
              value: val.value,
            },
          ])
        ),
      },
    })
  }

  const statusCode = err.statusCode || 400

  res.status(statusCode).json({
    message: err.message || 'Something went wrong',
    success: false,
    error: {
      name: err.name || 'Error',
      message: err.message || 'An unexpected error occurred',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      statusCode: statusCode,
      errorResponse: err,
    },
  })
}
