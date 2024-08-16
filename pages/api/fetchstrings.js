import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "String Basics",
  "description": "A string is a sequence of characters, and it is one of the most fundamental data types in programming. String operations include concatenation, substring extraction, searching, and pattern matching. Key concepts include immutability, string parsing, and manipulation functions. Strings are widely used in text processing, data serialization, and communication protocols...",
  "leetcodeProblems": [
    {
      "name": "Longest Substring Without Repeating Characters",
      "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
    },
    {
      "name": "Group Anagrams",
      "url": "https://leetcode.com/problems/group-anagrams/"
    },
    {
      "name": "Palindrome Partitioning",
      "url": "https://leetcode.com/problems/palindrome-partitioning/"
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
          Generate information about at least 10 topics related to strings. 
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
