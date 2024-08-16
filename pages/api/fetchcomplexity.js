import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Time and Space Complexity",
  "description": "Time and space complexity are crucial concepts in algorithm analysis, used to evaluate the efficiency of algorithms. Time complexity refers to the amount of time an algorithm takes to complete as a function of the input size, typically expressed using Big O notation (e.g., O(n), O(log n)). Space complexity, on the other hand, measures the amount of memory an algorithm uses as a function of the input size. These complexities help in understanding the scalability and performance of algorithms. Key topics include Big O notation, analyzing worst-case, average-case, and best-case scenarios, and understanding trade-offs between time and space.",
  "leetcodeProblems": [
    {
      "name": "Kth Largest Element in an Array",
      "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/"
    },
    {
      "name": "Implement Queue using Stacks",
      "url": "https://leetcode.com/problems/implement-queue-using-stacks/"
    },
    {
      "name": "Longest Substring Without Repeating Characters",
      "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
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
          Generate information about at least 5 topics related to time and space complexity in DSA. 
          Include detailed explanations about time complexity, space complexity, Big O notation, and analyzing different scenarios (worst-case, average-case, best-case). 
          Provide at least 3 related LeetCode problem links.
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
