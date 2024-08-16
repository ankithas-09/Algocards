import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Greedy Algorithms",
  "description": "Greedy algorithms are a class of algorithms that build up a solution piece by piece, always choosing the next piece that offers the most immediate benefit or is the most optimal at that moment. These algorithms work well for optimization problems where a locally optimal choice leads to a globally optimal solution. Common problems that can be solved using greedy algorithms include activity selection, Huffman coding, and the fractional knapsack problem. Greedy algorithms are often used due to their simplicity and efficiency, although they do not always guarantee an optimal solution for every problem...",
  "leetcodeProblems": [
    {
      "name": "Activity Selection",
      "url": "https://leetcode.com/problems/interval-scheduling-maximize/"
    },
    {
      "name": "Huffman Coding",
      "url": "https://leetcode.com/problems/encode-and-decode-strings/"
    },
    {
      "name": "Fractional Knapsack",
      "url": "https://leetcode.com/problems/maximum-units-on-a-truck/"
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
          Generate information about at least 7 topics related to greedy algorithms. 
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
