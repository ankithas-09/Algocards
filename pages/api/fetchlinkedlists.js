import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Linked Lists Basics",
  "description": "A linked list is a linear data structure where elements are stored in nodes, each pointing to the next node in the sequence...",
  "leetcodeProblems": [
    {
      "name": "Reverse Linked List",
      "url": "https://leetcode.com/problems/reverse-linked-list/"
    },
    {
      "name": "Add Two Numbers",
      "url": "https://leetcode.com/problems/add-two-numbers/"
    },
    {
      "name": "Merge Two Sorted Lists",
      "url": "https://leetcode.com/problems/merge-two-sorted-lists/"
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
          Generate information about at least 10 topics related to linked lists. 
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
