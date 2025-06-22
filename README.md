# Assingnment-3

### 📖Library Management API with Express, TypeScript & MongoDB

## Welcome to - **My Library Management System**

### Live Demo

- [appwrite-react](https://appwrite-reactjs.vercel.app/)

## Getting Started

Create package.json

```bash
npm init -y
```

Install Typescript as devDependencies

```bash
npm install -D typescript
```

Create tsconfig.json and configure

```bash
tsc --init
```

Install Express and mongoose

```bash
npm install express mongoose
npm install --save-dev @types/express
```

Install ts-node-dev

```bash
npm i ts-node-dev --save-dev
```

Configure "scripts" of package.json file

```bash
"scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
```

Bulk book data import (scripts/seedBooks.ts)

```bash
npm install -D ts-node

npx ts-node src/scripts/seedBooks.ts


```

Run the development server:

```bash
npm run dev
```

## 📚 API Endpoints – Book Management

### 🔹 Base URL

```bash
/api/books
```

### ✅ Create a New Book

- Method: `POST`
- Endpoint: `/api/books`
- Request Body:

```bash
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

### ✅ Get All Books

- Method: `GET`
- Endpoint: `/api/books`
- Query Parameters (optional):

| Param  | Type   | Description                     |
| ------ | ------ | ------------------------------- |
| filter | string | Filter by genre                 |
| sortBy | string | Field to sort by (e.g. `title`) |
| sort   | string | `asc` or `desc`                 |
| limit  | number | Limit number of returned books  |

```bash
/api/books?filter=FANTASY&sortBy=title&sort=asc&limit=5

```

- Response:

```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "count": 5,
  "data": [
    {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
      ...
    }
  ]
}

```

### ✅ Get a Single Book

- Method: `GET`
- Endpoint: `/api/books/:bookId`
- Response:

```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    ...
  }
}

```

### ✏️ Update a Book

- Method: `PATCH`
- Endpoint: `/api/books/:bookId`
- Request Body: (any updatable fields from create schema)

```bash
{
  "copies": 50
}
```

- Response:

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    ...
  }
}
```

### 🗑 Delete a Book

- Method: `DELETE`
- Endpoint: `/api/books/:bookId`
- Response:

```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

### 📖 Borrow a Book

- Method: `POST`
- Endpoint: `/api/books/:bookId`
- Request Body:

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

### 📖 Borrowed Books Summary

- Method: `GET`
- Endpoint: `/api/borrow`
- Response:

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

## Deploy on Vercel
