import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const shape = [{
  "question": "Who is Luke Skywalker's father?",
  "answer": "Darth Vader",
  "wrongAnswers": ["Obi-Wan Kenobi", "Emperor Palpatine", "Yoda"]
}];

export default async function handler(req, res) {
  try {
    // Request completion from OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: `
          generate 20 questions for Data Structures and Algorithms. include questions related to arrays, linked lists, stacks, queues, hashing, trees, heaps, graphs, strings, sets, sorting, searching, dynamic programming, greedy algorithms, backtracking, divide and conquer, graph algorithms, bit manipulation, string algorithms, computational geometry, complexity analysis, B-trees, and skip lists. include wrong answers
          format the response as JSON in the shape of: ${JSON.stringify(shape)}
        `
      }],
    });

    // Parse the API response
    const questions = JSON.parse(completion.choices[0].message.content);

    // Send questions as JSON response
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
}
