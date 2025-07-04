// scripts/seedBooks.ts
import mongoose from 'mongoose'
// Make sure the path is correct and the file exists; adjust as needed:
import BookModel from '../app/models/book.model'
import { Book } from '../app/interfaces/book.interface'
import dotenv from 'dotenv'

dotenv.config() // no path needed unless it's in a subdir

const sampleBooks: Book[] = [
  {
    title: 'The Time Machine',
    author: 'H.G. Wells',
    genre: 'FICTION',
    isbn: '9780451528551',
    description: 'A classic time travel story.',
    copies: 5,
    available: true,
    createdAt: '2025-06-22T11:29:34.732Z',
    updatedAt: '2025-06-22T11:29:34.732Z',
  },
  {
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    genre: 'SCIENCE',
    isbn: '9780553380164',
    description: 'An overview of cosmology.',
    copies: 4,
    available: true,
    createdAt: '2025-06-22T11:30:34.732Z',
    updatedAt: '2025-06-22T11:30:34.732Z',
  },
  {
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genre: 'HISTORY',
    isbn: '9780062316098',
    description: 'A history of humankind.',
    copies: 6,
    available: true,
    createdAt: '2025-06-22T11:31:34.732Z',
    updatedAt: '2025-06-22T11:31:34.732Z',
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    genre: 'BIOGRAPHY',
    isbn: '9780399590505',
    description: 'A memoir of family and self-discovery.',
    copies: 3,
    available: true,
    createdAt: '2025-06-22T11:32:34.732Z',
    updatedAt: '2025-06-22T11:32:34.732Z',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'FANTASY',
    isbn: '9780547928228',
    description: 'A fantasy adventure novel.',
    copies: 7,
    available: true,
    createdAt: '2025-06-22T11:33:34.732Z',
    updatedAt: '2025-06-22T11:33:34.732Z',
  },
  {
    title: 'The Selfish Gene',
    author: 'Richard Dawkins',
    genre: 'SCIENCE',
    isbn: '9780192860928',
    description: 'Evolution and genetics explained.',
    copies: 5,
    available: true,
    createdAt: '2025-06-22T11:34:34.732Z',
    updatedAt: '2025-06-22T11:34:34.732Z',
  },
  {
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    genre: 'BIOGRAPHY',
    isbn: '9781451648540',
    description: "Biography of Apple's co-founder.",
    copies: 6,
    available: true,
    createdAt: '2025-06-22T11:35:34.732Z',
    updatedAt: '2025-06-22T11:35:34.732Z',
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'FICTION',
    isbn: '9780451524936',
    description: 'Dystopian society critique.',
    copies: 9,
    available: true,
    createdAt: '2025-06-22T11:36:34.732Z',
    updatedAt: '2025-06-22T11:36:34.732Z',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'NON_FICTION',
    isbn: '9780735211293',
    description: 'Habit building techniques.',
    copies: 10,
    available: true,
    createdAt: '2025-06-22T11:37:34.732Z',
    updatedAt: '2025-06-22T11:37:34.732Z',
  },
  {
    title: 'The Art of War',
    author: 'Sun Tzu',
    genre: 'HISTORY',
    isbn: '9781599869774',
    description: 'Ancient military strategy.',
    copies: 3,
    available: true,
    createdAt: '2025-06-22T11:38:34.732Z',
    updatedAt: '2025-06-22T11:38:34.732Z',
  },

  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'FICTION',
    isbn: '9780060850524',
    description: 'A dystopian novel of the future.',
    copies: 7,
    available: true,
    createdAt: '2025-06-22T11:39:34.732Z',
    updatedAt: '2025-06-22T11:39:34.732Z',
  },
  {
    title: 'Cosmos',
    author: 'Carl Sagan',
    genre: 'SCIENCE',
    isbn: '9780345539434',
    description: 'Exploration of space and time.',
    copies: 4,
    available: true,
    createdAt: '2025-06-22T11:40:34.732Z',
    updatedAt: '2025-06-22T11:40:34.732Z',
  },
  {
    title: 'The Diary of a Young Girl',
    author: 'Anne Frank',
    genre: 'BIOGRAPHY',
    isbn: '9780553296983',
    description: 'A powerful WWII memoir.',
    copies: 5,
    available: true,
    createdAt: '2025-06-22T11:41:34.732Z',
    updatedAt: '2025-06-22T11:41:34.732Z',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'FANTASY',
    isbn: '9780061120084',
    description: 'Race and justice in the South.',
    copies: 6,
    available: true,
    createdAt: '2025-06-22T11:42:34.732Z',
    updatedAt: '2025-06-22T11:42:34.732Z',
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'FANTASY',
    isbn: '9780544003415',
    description: 'Epic fantasy adventure.',
    copies: 10,
    available: true,
    createdAt: '2025-06-22T11:43:34.732Z',
    updatedAt: '2025-06-22T11:43:34.732Z',
  },
  {
    title: 'Guns, Germs, and Steel',
    author: 'Jared Diamond',
    genre: 'NON_FICTION',
    isbn: '9780393317558',
    description: 'Human history and geography.',
    copies: 4,
    available: true,
    createdAt: '2025-06-22T11:44:34.732Z',
    updatedAt: '2025-06-22T11:44:34.732Z',
  },
  {
    title: 'Frankenstein',
    author: 'Mary Shelley',
    genre: 'FICTION',
    isbn: '9780486282114',
    description: 'The original science fiction horror.',
    copies: 5,
    available: true,
    createdAt: '2025-06-22T11:45:34.732Z',
    updatedAt: '2025-06-22T11:45:34.732Z',
  },
  {
    title: 'Quiet',
    author: 'Susan Cain',
    genre: 'NON_FICTION',
    isbn: '9780307352156',
    description: 'The power of introverts.',
    copies: 3,
    available: true,
    createdAt: '2025-06-22T11:46:34.732Z',
    updatedAt: '2025-06-22T11:46:34.732Z',
  },
  {
    title: 'Dracula',
    author: 'Bram Stoker',
    genre: 'FANTASY',
    isbn: '9780486411096',
    description: 'A gothic horror classic.',
    copies: 4,
    available: true,
    createdAt: '2025-06-22T11:47:34.732Z',
    updatedAt: '2025-06-22T11:47:34.732Z',
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'FANTASY',
    isbn: '9780316769488',
    description: 'A teenage journey of identity.',
    copies: 5,
    available: true,
    createdAt: '2025-06-22T11:48:34.732Z',
    updatedAt: '2025-06-22T11:48:34.732Z',
  },
  {
    title: 'The Road',
    author: 'Cormac McCarthy',
    genre: 'FICTION',
    isbn: '9780307387899',
    description: 'A dark journey of survival.',
    copies: 6,
    available: true,
    createdAt: '2025-06-22T11:49:34.732Z',
    updatedAt: '2025-06-22T11:49:34.732Z',
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    genre: 'NON_FICTION',
    isbn: '9780374533557',
    description: 'Cognitive biases and decision making.',
    copies: 4,
    available: true,
    createdAt: '2025-06-22T11:50:34.732Z',
    updatedAt: '2025-06-22T11:50:34.732Z',
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'FICTION',
    isbn: '9780061122415',
    description: 'A journey to find destiny.',
    copies: 8,
    available: true,
    createdAt: '2025-06-22T11:51:34.732Z',
    updatedAt: '2025-06-22T11:51:34.732Z',
  },
  {
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    genre: 'FICTION',
    isbn: '9780156012195',
    description: 'A poetic tale of life and love.',
    copies: 9,
    available: true,
    createdAt: '2025-06-22T11:52:34.732Z',
    updatedAt: '2025-06-22T11:52:34.732Z',
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'FICTION',
    isbn: '9781503280786',
    description: 'A whale of a story.',
    copies: 3,
    available: true,
    createdAt: '2025-06-22T11:53:34.732Z',
    updatedAt: '2025-06-22T11:53:34.732Z',
  },
  {
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    genre: 'FICTION',
    isbn: '9781451673319',
    description: 'A world where books are banned.',
    copies: 6,
    available: true,
    createdAt: '2025-06-22T11:54:34.732Z',
    updatedAt: '2025-06-22T11:54:34.732Z',
  },
  {
    title: 'The Shining',
    author: 'Stephen King',
    genre: 'FICTION',
    isbn: '9780307743657',
    description: 'A psychological horror thriller.',
    copies: 7,
    available: true,
    createdAt: '2025-06-22T11:55:34.732Z',
    updatedAt: '2025-06-22T11:55:34.732Z',
  },
  {
    title: 'The Martian',
    author: 'Andy Weir',
    genre: 'SCIENCE',
    isbn: '9780553418026',
    description: 'Survival on Mars.',
    copies: 4,
    available: true,
    createdAt: '2025-06-22T11:56:34.732Z',
    updatedAt: '2025-06-22T11:56:34.732Z',
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'FANTASY',
    isbn: '9780441172719',
    description: 'Sci-fi political epic.',
    copies: 6,
    available: true,
    createdAt: '2025-06-22T11:57:34.732Z',
    updatedAt: '2025-06-22T11:57:34.732Z',
  },
  {
    title: 'Man’s Search for Meaning',
    author: 'Viktor E. Frankl',
    genre: 'NON_FICTION',
    isbn: '9780807014295',
    description: 'Life in concentration camps and purpose.',
    copies: 4,
    available: true,
    createdAt: '2025-06-22T11:58:34.732Z',
    updatedAt: '2025-06-22T11:58:34.732Z',
  },
]

async function seedBooks() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/book-app`) // Update if needed
    console.log('Connected to DB')

    // Optional: Clear existing data
    await BookModel.deleteMany({})

    // Insert sample data
    await BookModel.insertMany(sampleBooks)
    console.log('Books inserted successfully')

    await mongoose.disconnect()
  } catch (err) {
    console.error('Error inserting books:', err)
  }
}

seedBooks()
