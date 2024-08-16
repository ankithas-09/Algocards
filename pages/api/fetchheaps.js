import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Heap Basics",
  "description": "A heap is a specialized tree-based data structure that satisfies the heap property. In a max heap, for any given node C, the value of C is less than or equal to the value of its parent node. In a min heap, the value of C is greater than or equal to the value of its parent node. Heaps are used in algorithms such as heap sort and in data structures like priority queues...",
  "leetcodeProblems": [
    {
      "name": "Kth Largest Element in an Array",
      "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/"
    },
    {
      "name": "Merge k Sorted Lists",
      "url": "https://leetcode.com/problems/merge-k-sorted-lists/"
    },
    {
      "name": "Top K Frequent Elements",
      "url": "https://leetcode.com/problems/top-k-frequent-elements/"
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
          Generate information about at least 10 topics related to heaps. 
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
