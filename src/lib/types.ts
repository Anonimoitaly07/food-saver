
// Type definitions for our application
export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin?: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  expirationDate: Date;
  createdAt: Date;
  userId: string;
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  imageUrl?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
