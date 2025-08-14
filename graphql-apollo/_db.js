const authors = [
  {
    id: "a1",
    name: "Alice Johnson"
  },
  {
    id: "a2",
    name: "Bob Smith"
  },
  {
    id: "a3",
    name: "Carol Lee"
  }
]

const posts = [
  {
    id: "p1",
    title: "Understanding GraphQL",
    body: "GraphQL is a query language for APIs...",
    tags: ["GraphQL", "API", "WebDev"],
    author: "a1",
    comments: ["c1", "c2"]
  },
  {
    id: "p2",
    title: "Intro to React",
    body: "React is a JavaScript library for building UI...",
    tags: ["React", "JavaScript", "Frontend"],
    author: "a2",
    comments: ["c2", "c3"]
  },
  {
    id: "p3",
    title: "Using TypeScript with Node.js",
    body: "TypeScript adds static types to JavaScript...",
    tags: ["TypeScript", "Node.js"],
    author: "a3",
    comments: ["c1"]
  },
  {
    id: "p4",
    title: "CSS Grid vs Flexbox",
    body: "Both are powerful layout systems in CSS...",
    tags: ["CSS", "Design", "Flexbox", "Grid"],
    author: "a1",
    comments: ["c1"]
  },
  {
    id: "p5",
    title: "REST vs GraphQL",
    body: "GraphQL offers more flexibility than REST...",
    tags: ["GraphQL", "REST", "API"],
    author: "a2",
    comments: ["c1", "c2", "c3"]
  },
  {
    id: "p6",
    title: "Getting Started with Docker",
    body: "Docker is a tool designed to make it easier to create containers...",
    tags: ["Docker", "DevOps"],
    author: "a3",
    comments: []
  },
  {
    id: "p7",
    title: "Functional Programming in JS",
    body: "FP is a paradigm that treats computation as evaluation of functions...",
    tags: ["JavaScript", "Functional"],
    author: "a1",
    comments: []
  },
  {
    id: "p8",
    title: "Building a Blog with Next.js",
    body: "Next.js is a React framework with server-side rendering...",
    tags: ["Next.js", "React"],
    author: "a2",
    comments: []
  },
  {
    id: "p9",
    title: "What’s New in ES2025",
    body: "ES2025 brings several new features like pattern matching...",
    tags: ["JavaScript", "ES2025"],
    author: "a3",
    comments: []
  },
  {
    id: "p10",
    title: "Dark Mode in CSS",
    body: "Learn how to implement dark mode using media queries...",
    tags: ["CSS", "DarkMode", "UX"],
    author: "a1",
    comments: []
  }
]

const comments = [
  {
    id: "c1",
    message: "Great post!",
    author: "a2"
  },
  {
    id: "c2",
    message: "Very informative.",
    author: "a3"
  },
  {
    id: "c3",
    message: "I have a question about this.",
    author: "a1"
  },
  {
    id: "c4",
    message: "Thanks for sharing.",
    author: "a3"
  },
  {
    id: "c5",
    message: "This helped me a lot.",
    author: "a2"
  }
]



export default { authors, posts, comments }