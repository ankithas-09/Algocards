import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "name": "Sorting Algorithms",
  "description": "Sorting algorithms are used to arrange elements in a list or array in a specific order, such as ascending or descending. Some common sorting algorithms include Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, and Heap Sort. Bubble Sort repeatedly steps through the list, comparing adjacent elements and swapping them if they are in the wrong order. Selection Sort improves on this by selecting the minimum element from the unsorted portion and placing it in the correct position. Insertion Sort builds the final sorted array one item at a time, while Merge Sort divides the array into halves, recursively sorts each half, and then merges them. Quick Sort uses a divide-and-conquer approach to partition the array and sort the partitions. Heap Sort involves building a heap data structure and then sorting it. Each algorithm has different time complexities and is suitable for different scenarios.",
  "leetcodeProblems": [
    {
      "name": "Merge Intervals",
      "url": "https://leetcode.com/problems/merge-intervals/"
    },
    {
      "name": "Sort Colors",
      "url": "https://leetcode.com/problems/sort-colors/"
    },
    {
      "name": "Kth Largest Element in an Array",
      "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/"
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
          Generate information about at least 10 topics related to sorting algorithms. 
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
