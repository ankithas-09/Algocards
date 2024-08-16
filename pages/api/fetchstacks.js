import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Stacks Basics",
  "description": "A stack is a linear data structure that follows the Last In First Out (LIFO) principle. Elements are added and removed from the top of the stack...",
  "leetcodeProblems": [
    {
      "name": "Valid Parentheses",
      "url": "https://leetcode.com/problems/valid-parentheses/"
    },
    {
      "name": "Min Stack",
      "url": "https://leetcode.com/problems/min-stack/"
    },
    {
      "name": "Evaluate Reverse Polish Notation",
      "url": "https://leetcode.com/problems/evaluate-reverse-polish-notation/"
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
          Generate information about at least 10 topics related to stacks. 
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
