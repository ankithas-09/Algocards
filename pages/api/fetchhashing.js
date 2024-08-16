import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Hashing Basics",
  "description": "Hashing is a technique used to uniquely identify a specific object from a group of similar objects. It involves mapping data to a fixed-size value or hash code. Hash functions are used in hash tables, hash maps, and other data structures to facilitate efficient data retrieval...",
  "leetcodeProblems": [
    {
      "name": "Two Sum",
      "url": "https://leetcode.com/problems/two-sum/"
    },
    {
      "name": "Group Anagrams",
      "url": "https://leetcode.com/problems/group-anagrams/"
    },
    {
      "name": "Longest Consecutive Sequence",
      "url": "https://leetcode.com/problems/longest-consecutive-sequence/"
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
          Generate information about at least 10 topics related to hashing. 
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
