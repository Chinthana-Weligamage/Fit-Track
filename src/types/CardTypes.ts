export interface PostCard {
  post: Post;
}

export interface Post {
  id?: string;
  metadata?: Metadata;
  title: string;
  description: string;
  imageUrls: string[];
}

export interface Exercise {
  name: string;
  description: string;
  order: number;
}

export interface WorkoutCard {
  workout: Workout;
}

export interface Workout {
  id?: string;
  metadata?: Metadata;
  name: string;
  description: string;
  exercises: Exercise[];
}

export interface Achievement {
  id?: string;
  metadata?: Metadata;
  description: string;
  imageUrls: string[];
  video?: string | File | null;
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
  name: string;
  description: string;
  questions: Questions[];
}

export interface Questions {
  question: string;
  options: string[];
  answer: string;
}

export interface Metadata {
  authorName: string;
  publishedDate: string;
  authorImage: string;
}
