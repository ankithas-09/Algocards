import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Graph Basics",
  "description": "A graph is a collection of nodes (vertices) and edges connecting pairs of nodes. Graphs can be directed or undirected, and they can have weights on the edges. Key concepts include traversals (e.g., BFS and DFS), shortest paths (e.g., Dijkstra's and Bellman-Ford algorithms), and various types of graphs (e.g., trees, bipartite graphs). Graphs are used in many real-world applications, such as social networks, transportation systems, and recommendation engines...",
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
      "name": "Network Delay Time",
      "url": "https://leetcode.com/problems/network-delay-time/"
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
          Generate information about at least 10 topics related to graphs. 
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
