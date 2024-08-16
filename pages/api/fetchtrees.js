import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Tree Basics",
  "description": "A tree is a hierarchical data structure consisting of nodes, with a single node known as the root. Each node can have zero or more child nodes. Trees are used in various applications, including representing hierarchical data, managing sorted data, and more. Common types of trees include binary trees, binary search trees, AVL trees, and B-trees...",
  "leetcodeProblems": [
    {
      "name": "Binary Tree Inorder Traversal",
      "url": "https://leetcode.com/problems/binary-tree-inorder-traversal/"
    },
    {
      "name": "Maximum Depth of Binary Tree",
      "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
    },
    {
      "name": "Balanced Binary Tree",
      "url": "https://leetcode.com/problems/balanced-binary-tree/"
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
          Generate information about at least 10 topics related to trees. 
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
