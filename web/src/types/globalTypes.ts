export type Category = "Tech"| "AI" | "Dev";

export interface News {
    id: string,
    title: string,
    description: string,
    imageUrl: string,
    category: string,
    viewsCount: number,
    publishedAt: Date
}

export interface UpdateNewsData {
  title?: string;
  description?: string;
  category?: string;
  image?: File;
}

export type AuthForm = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  twoFactorCode?: string;
};

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export type User = {
  id: string;
  name: string;
  email: string;
  bio?: string;
  role: string;
  profileImage?: string;
};

export type SettingsTab = {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
};

export type SettingsProfileFormValues = {
  name: string;
  email: string;
  bio: string;
  profilePictureUrl?: any[];
};

export type SettingsPasswordFormValues = {
  newPassword: string;
  confirmNewPassword: string;
};

export type SupportData = {
  name: string;
  email: string;
  message: string;
};

export type CommentType = {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
}