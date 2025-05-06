import WorkoutCard from "@/components/cards/WorkoutCard";
import AddWorkoutModal from "./AddWorkout";
import { Workout } from "@/types/CardTypes";

const sampleWorkouts: Workout[] = [
  {
    metadata: {
      authorName: "John Doe",
      publishedDate: "07th May 2023",
      authorImage:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    name: "Beginner friendly workout",
    description: "This workout is perfect for beginners",
    exercises: [
      {
        name: "Push up",
        description: "3 sets of 10 reps",
        order: 1,
      },
      {
        name: "Squat",
        description: "3 sets of 15 reps",
        order: 2,
      },
      {
        name: "Plank",
        description: "3 sets of 30 seconds",
        order: 3,
      },
      {
        name: "Lunges",
        description: "3 sets of 10 reps each leg",
        order: 4,
      },
    ],
  },
  {
    metadata: {
      authorName: "John Doe",
      publishedDate: "07th May 2023",
      authorImage:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    name: "Intermediate bodyweight workout",
    description: "This workout is perfect for intermediate users",
    exercises: [
      {
        name: "Burpees",
        description: "3 sets of 10 reps",
        order: 1,
      },
      {
        name: "Dips",
        description: "3 sets of 15 reps",
        order: 2,
      },
      {
        name: "Mountain climbers",
        description: "3 sets of 30 seconds",
        order: 3,
      },
      {
        name: "Jumping jacks",
        description: "3 sets of 10 reps",
        order: 4,
      },
    ],
  },
  {
    metadata: {
      authorName: "John Doe",
      publishedDate: "07th May 2023",
      authorImage:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    name: "Advanced bodyweight workout",
    description: "This workout is perfect for advanced users",
    exercises: [
      {
        name: "Pull ups",
        description: "3 sets of 10 reps",
        order: 1,
      },
      {
        name: "Dips",
        description: "3 sets of 15 reps",
        order: 2,
      },
      {
        name: "Sprints",
        description: "3 sets of 30 seconds",
        order: 3,
      },
      {
        name: "Jumping lunges",
        description: "3 sets of 10 reps each leg",
        order: 4,
      },
    ],
  },
  {
    metadata: {
      authorName: "John Doe",
      publishedDate: "07th May 2023",
      authorImage:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    name: "Core strength workout",
    description: "This workout is perfect for improving core strength",
    exercises: [
      {
        name: "Plank",
        description: "3 sets of 60 seconds",
        order: 1,
      },
      {
        name: "Bicycle crunches",
        description: "3 sets of 15 reps",
        order: 2,
      },
      {
        name: "Russian twists",
        description: "3 sets of 10 reps",
        order: 3,
      },
      {
        name: "Leg raises",
        description: "3 sets of 10 reps",
        order: 4,
      },
    ],
  },
];

const ViewWorkouts = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto my-10 gap-6 px-4 overflow-y-auto">
      <div className="fixed top-10 right-10 z-50">
        <AddWorkoutModal />
      </div>
      {sampleWorkouts.map((workout, index) => (
        <WorkoutCard
          key={index}
          workout={{
            name: workout.name,
            description: workout.description,
            exercises: workout.exercises,
          }}
        />
      ))}
    </div>
  );
};

export default ViewWorkouts;
