import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Divide and Conquer Algorithms",
  "description": "Divide and Conquer is a fundamental algorithmic paradigm that breaks a problem into smaller subproblems, solves each subproblem independently, and then combines the solutions to solve the original problem. This approach is used to solve many complex problems efficiently. Common divide and conquer algorithms include Merge Sort, Quick Sort, and the Fast Fourier Transform. These algorithms are often used in sorting, searching, and numerical analysis problems...",
  "leetcodeProblems": [
    {
      "name": "Merge Sort",
      "url": "https://leetcode.com/problems/sort-an-array/"
    },
    {
      "name": "Quick Sort",
      "url": "https://leetcode.com/problems/sort-an-array/"
    },
    {
      "name": "Binary Search",
      "url": "https://leetcode.com/problems/binary-search/"
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
          Generate information about at least 7 topics related to divide and conquer algorithms. 
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
