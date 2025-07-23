import { PrismaClient } from '../generated/prisma/index.js'

const prisma = new PrismaClient()

const mockPosts = [
  {
    name: "Getting Started with React",
    description: "A comprehensive guide to building your first React application with modern hooks and best practices."
  },
  {
    name: "Node.js Performance Tips",
    description: "Learn how to optimize your Node.js applications for better performance and scalability."
  },
  {
    name: "Database Design Principles",
    description: "Understanding the fundamentals of relational database design and normalization techniques."
  },
  {
    name: "JavaScript ES6 Features",
    description: "Explore the latest JavaScript features including arrow functions, destructuring, and async/await."
  },
  {
    name: "Building RESTful APIs",
    description: "Best practices for designing and implementing REST APIs with proper HTTP methods and status codes."
  },
  {
    name: "CSS Grid Layout",
    description: "Master CSS Grid to create complex and responsive web layouts with ease."
  },
  {
    name: "Testing in JavaScript",
    description: "A complete guide to unit testing, integration testing, and end-to-end testing in JavaScript applications."
  },
  {
    name: "Docker for Developers",
    description: "Learn how to containerize your applications using Docker for consistent development and deployment."
  }
]

export const seedDatabase = async () => {
  try {
    console.log('Starting database seed...')
    console.log('Connecting to database...')
    
    // Test connection
    await prisma.$connect()
    console.log('Database connected successfully')
    
    // Clear existing posts
    const deleteResult = await prisma.posts.deleteMany({})
    console.log(`Cleared ${deleteResult.count} existing posts`)
    
    // Insert mock data
    const createdPosts = await prisma.posts.createMany({
      data: mockPosts
    })
    
    console.log(`Successfully seeded ${createdPosts.count} posts`)
    
    // Verify the data was inserted
    const totalPosts = await prisma.posts.count()
    console.log(`Total posts in database: ${totalPosts}`)
    
    return createdPosts
  } catch (error) {
    console.error('Error seeding database:', error)
    console.error('Error details:', error.message)
    throw error
  } finally {
    await prisma.$disconnect()
    console.log('Database connection closed')
  }
}

// Allow running this file directly
if (import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  seedDatabase()
    .then(() => {
      console.log('Database seeding completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Seeding failed:', error)
      process.exit(1)
    })
}