export interface PostCard {
  post: Post;
}

export interface Post {
  creatorId?: string;
  id?: string;
  metadata?: Metadata;
  title: string;
  description: string;
  imageUrls: string[];
}

export interface Exercise {
  imageUrl?: string | null;
  image?: string | File | null;
  name?: string;
  description?: string;
  order?: number;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  authorName: string;
  authorImage: string;
}

export interface WorkoutCard {
  workout: Workout;
}

export interface Workout {
  id?: string;
  metadata?: Metadata;
  name?: string;
  description?: string;
  exercises?: Exercise[];
  imageUrl?: string[];
  creatorId?: string;
}

export interface Achievement {
  id?: string;
  metadata?: Metadata;
  description: string;
  imageUrls: string[];
  videoUrl?: string | null; // Changed from boolean to string | null
  video?: string | File | null;
}

export interface AchievementCardProps {
  achievement: Achievement;
  onUpdate?: (updatedAchievement: Achievement) => void;
  onDelete?: (id: string) => void;
}

export interface AchievementCard {
  achievement: Achievement;
}

export interface QuizCard {
  quiz: Quiz;
}

export interface Quiz {
  id?: string;
  metadata?: Metadata;
  name?: string;
  description?: string;
  questions?: Questions[];
}

export interface Questions {
  question?: string;
  options?: string[];
  answer?: string;
}

export interface Metadata {
  authorName: string;
  publishedDate: string;
  authorImage: string;
}
