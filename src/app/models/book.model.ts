export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publicationYear: number;
  available: boolean;
  coverImage?: string;
  description?: string;
  location?: string;
  thumbnail?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface Loan {
  id: number;
  bookId: number;
  userId: number;
  loanDate: Date;
  returnDate: Date;
  returned: boolean;
  book?: Book;
  user?: User;
} 