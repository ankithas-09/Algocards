import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Advanced Data Structures",
  "description": "Advanced data structures are specialized structures designed to solve specific types of problems efficiently. Key examples include the Trie, Segment Tree, and Fenwick Tree. A Trie (or prefix tree) is used for storing strings and supports fast retrieval and prefix-based operations. A Segment Tree is an advanced structure for handling range queries and updates efficiently, particularly useful in scenarios involving range minimum queries or range sum queries. A Fenwick Tree (or Binary Indexed Tree) is used for efficiently updating and querying prefix sums, offering a compact alternative to the segment tree. Each of these structures has specific use cases and advantages in algorithm design and data manipulation.",
  "leetcodeProblems": [
    {
      "name": "Add and Search Word - Data structure",
      "url": "https://leetcode.com/problems/add-and-search-word-data-structure-design/"
    },
    {
      "name": "Range Sum Query - Mutable",
      "url": "https://leetcode.com/problems/range-sum-query-mutable/"
    },
    {
      "name": "Count of Smaller Numbers After Self",
      "url": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/"
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
          Generate information about at least 5 advanced data structures such as Trie, Segment Tree, and Fenwick Tree. 
          Include detailed explanations for each data structure, including their use cases, advantages, and example problems.
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
