import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Set Basics",
  "description": "A set is a data structure that represents a collection of unique elements. Sets are used to store values in an unordered manner and are commonly used to perform operations like union, intersection, and difference. Key operations on sets include adding elements, removing elements, and checking for membership. Sets are particularly useful in scenarios where uniqueness is important, and they offer efficient performance for these operations...",
  "leetcodeProblems": [
    {
      "name": "Single Number",
      "url": "https://leetcode.com/problems/single-number/"
    },
    {
      "name": "Intersection of Two Arrays II",
      "url": "https://leetcode.com/problems/intersection-of-two-arrays-ii/"
    },
    {
      "name": "Unique Email Addresses",
      "url": "https://leetcode.com/problems/unique-email-addresses/"
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
          Generate information about at least 10 topics related to sets. 
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
