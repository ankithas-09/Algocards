import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Searching Algorithms",
  "description": "Searching algorithms are fundamental techniques used to locate a specific element within a data structure or to determine if an element exists. Common searching algorithms include linear search, binary search, and hashing. Linear search, also known as sequential search, examines each element in the data structure one by one until the target element is found or the end is reached. Binary search is more efficient than linear search but requires the data to be sorted; it repeatedly divides the search interval in half. Hashing involves using a hash function to map data elements to specific locations in a hash table. Each of these algorithms has its own use cases and performance characteristics, making them suitable for different scenarios depending on the data structure and the problem at hand.",
  "leetcodeProblems": [
    {
      "name": "Binary Search",
      "url": "https://leetcode.com/problems/binary-search/"
    },
    {
      "name": "Search Insert Position",
      "url": "https://leetcode.com/problems/search-insert-position/"
    },
    {
      "name": "Find Minimum in Rotated Sorted Array",
      "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
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
          Generate information about at least 10 topics related to searching algorithms. 
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
