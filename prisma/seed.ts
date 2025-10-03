import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create workout types
  console.log('Creating workout types...')
  
  const workoutTypes = await Promise.all([
    prisma.workoutType.create({
      data: {
        name: 'Cardio',
        description: 'Cardiovascular exercises to improve heart health and endurance',
        color: '#10b981', // Emerald
      },
    }),
    prisma.workoutType.create({
      data: {
        name: 'Strength',
        description: 'Resistance training to build muscle strength and mass',
        color: '#3b82f6', // Blue
      },
    }),
    prisma.workoutType.create({
      data: {
        name: 'Yoga',
        description: 'Mind-body practice combining physical poses, breathing, and meditation',
        color: '#f59e0b', // Amber
      },
    }),
    prisma.workoutType.create({
      data: {
        name: 'Swimming',
        description: 'Full-body workout in water, excellent for joints and cardiovascular health',
        color: '#06b6d4', // Cyan
      },
    }),
    prisma.workoutType.create({
      data: {
        name: 'Cycling',
        description: 'Low-impact cardio exercise, great for leg strength and endurance',
        color: '#8b5cf6', // Violet
      },
    }),
    prisma.workoutType.create({
      data: {
        name: 'Running',
        description: 'High-impact cardio exercise, builds endurance and burns calories',
        color: '#ef4444', // Red
      },
    }),
  ])

  console.log(`Created ${workoutTypes.length} workout types`)

  // Create a demo user
  console.log('Creating demo user...')
  
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@fittrack.com',
      name: 'Demo User',
    },
  })

  console.log(`Created user: ${demoUser.email}`)

  // Create some sample workouts
  console.log('Creating sample workouts...')
  
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const twoDaysAgo = new Date(today)
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

  const sampleWorkouts = await Promise.all([
    prisma.workout.create({
      data: {
        userId: demoUser.id,
        workoutTypeId: workoutTypes[0].id, // Cardio
        durationMin: 45,
        calories: 320,
        performedAt: today,
        notes: 'Morning run in the park. Felt great today!',
      },
    }),
    prisma.workout.create({
      data: {
        userId: demoUser.id,
        workoutTypeId: workoutTypes[1].id, // Strength
        durationMin: 60,
        calories: 280,
        performedAt: yesterday,
        notes: 'Upper body workout - chest, shoulders, triceps',
      },
    }),
    prisma.workout.create({
      data: {
        userId: demoUser.id,
        workoutTypeId: workoutTypes[2].id, // Yoga
        durationMin: 30,
        calories: 150,
        performedAt: twoDaysAgo,
        notes: 'Evening relaxation session with deep stretches',
      },
    }),
  ])

  console.log(`Created ${sampleWorkouts.length} sample workouts`)

  // Create a sample weekly plan
  console.log('Creating sample workout plan...')
  
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - weekStart.getDay()) // Start of current week
  
  const plan = await prisma.plan.create({
    data: {
      userId: demoUser.id,
      title: 'Beginner Fitness Plan',
      description: 'A balanced weekly plan for beginners focusing on cardio and strength',
      weekStart: weekStart,
      planDays: {
        create: [
          {
            dayOfWeek: 1, // Monday
            workoutTypeId: workoutTypes[0].id, // Cardio
            targetDuration: 30,
            targetCalories: 250,
            description: 'Light cardio to start the week',
          },
          {
            dayOfWeek: 3, // Wednesday
            workoutTypeId: workoutTypes[1].id, // Strength
            targetDuration: 45,
            targetCalories: 200,
            description: 'Upper body strength training',
          },
          {
            dayOfWeek: 5, // Friday
            workoutTypeId: workoutTypes[0].id, // Cardio
            targetDuration: 40,
            targetCalories: 300,
            description: 'End-of-week cardio session',
          },
          {
            dayOfWeek: 0, // Sunday
            workoutTypeId: workoutTypes[2].id, // Yoga
            targetDuration: 60,
            targetCalories: 180,
            description: 'Relaxing yoga session',
          },
        ],
      },
    },
  })

  console.log(`Created workout plan: ${plan.title}`)
  
  console.log('Seed data created successfully! 🌱')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })