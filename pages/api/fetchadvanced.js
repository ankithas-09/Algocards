import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Advanced Data Structures and Techniques",
  "description": "Advanced data structures and techniques include complex and optimized approaches for solving problems efficiently. Topics in this category often include advanced tree structures like AVL trees and Red-Black trees, complex graph algorithms like Dijkstra's and Floyd-Warshall for shortest paths, and techniques such as segment trees, Fenwick trees (Binary Indexed Trees), and trie structures. These structures and algorithms are used to optimize performance for specific types of operations, such as search, insert, and delete operations, and are essential for solving complex problems in computer science.",
  "leetcodeProblems": [
    {
      "name": "Median of Two Sorted Arrays",
      "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/"
    },
    {
      "name": "Longest Valid Parentheses",
      "url": "https://leetcode.com/problems/longest-valid-parentheses/"
    },
    {
      "name": "Trie (Prefix Tree)",
      "url": "https://leetcode.com/problems/implement-trie-prefix-tree/"
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
          Generate information about atleast 5 advanced data structures and techniques. 
          Include detailed explanations on topics such as advanced tree structures, complex graph algorithms, and other sophisticated data structures. 
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
