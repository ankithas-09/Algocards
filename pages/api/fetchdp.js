import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Dynamic Programming",
  "description": "Dynamic programming is a method for solving complex problems by breaking them down into simpler subproblems. It is used in optimization problems where the solution can be constructed from solutions of its subproblems. Dynamic programming is characterized by solving each subproblem only once and storing the results for future use to avoid redundant computations. This approach is particularly useful for problems with overlapping subproblems and optimal substructure. Common dynamic programming problems include the knapsack problem, longest common subsequence, and matrix chain multiplication. Dynamic programming can be implemented using either a top-down (memoization) or bottom-up (tabulation) approach...",
  "leetcodeProblems": [
    {
      "name": "0/1 Knapsack Problem",
      "url": "https://leetcode.com/problems/knapsack-with-duplicate-items/"
    },
    {
      "name": "Longest Common Subsequence",
      "url": "https://leetcode.com/problems/longest-common-subsequence/"
    },
    {
      "name": "Matrix Chain Multiplication",
      "url": "https://leetcode.com/problems/matrix-chain-multiplication/"
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
          Generate information about at least 10 topics related to dynamic programming. 
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
