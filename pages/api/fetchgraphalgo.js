import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Graph Algorithms Basics",
  "description": "Graph algorithms are techniques used to traverse, search, and process graphs. They are fundamental in solving problems involving networks, paths, and connectivity. Key graph algorithms include depth-first search (DFS), breadth-first search (BFS), Dijkstra's algorithm, and Bellman-Ford algorithm. These algorithms are used for finding shortest paths, detecting cycles, and optimizing network flows. Understanding graph algorithms is crucial for solving complex problems in various fields such as computer science, logistics, and social network analysis...",
  "leetcodeProblems": [
    {
      "name": "Number of Islands",
      "url": "https://leetcode.com/problems/number-of-islands/"
    },
    {
      "name": "Course Schedule",
      "url": "https://leetcode.com/problems/course-schedule/"
    },
    {
      "name": "Word Ladder II",
      "url": "https://leetcode.com/problems/word-ladder-ii/"
    }
  ]
}];

export default async function handler(req, res) {
  try {
    // Request completion from OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: `
          Generate information about at least 7 topics related to graph algorithms. 
          Include the name of the topic, a long explanation about that topic, 
          and at least 3 LeetCode problem links related to that topic.
          Format the response as JSON in the shape of: ${JSON.stringify(shape)}
        `
      }],
    });

    // Parse the API response
    const topics = JSON.parse(completion.choices[0].message.content);

    // Send topics as JSON response
    res.status(200).json(topics);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
}
