import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Backtracking Algorithms",
  "description": "Backtracking is an algorithmic technique for solving problems incrementally by trying partial solutions and abandoning them if they lead to an invalid solution. It is particularly useful for solving constraint satisfaction problems and puzzles. Common backtracking algorithms include those for solving the N-Queens problem, Sudoku, and various combinatorial problems like the knapsack problem. This technique explores all possible options and chooses the valid ones by discarding invalid ones through a recursive approach...",
  "leetcodeProblems": [
    {
      "name": "N-Queens",
      "url": "https://leetcode.com/problems/n-queens/"
    },
    {
      "name": "Sudoku Solver",
      "url": "https://leetcode.com/problems/sudoku-solver/"
    },
    {
      "name": "Combination Sum",
      "url": "https://leetcode.com/problems/combination-sum/"
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
          Generate information about at least 7 topics related to backtracking algorithms. 
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
