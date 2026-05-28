import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {

  try {

    const { question } = await req.json();

    if (!question) {
      return Response.json(
        { error: "No question provided" },
        { status: 400 }
      );
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content: `
You are a friendly AI math tutor.

Rules:
- Keep explanations SHORT
- Make answers EASY to read
- Sound like Duolingo
- Use spacing between steps
- Never write huge paragraphs
- Explain like talking to a student
- Focus on clarity
- Highlight the final answer clearly

Example style:

Step 1:
Move 3 to the other side.

Step 2:
Divide by 2.

Final Answer:
x = 4

Keep responses clean and modern.
`
        },

        {
          role: "user",
          content: question
        }
      ],

      temperature: 0.7,
      max_tokens: 300
    });

    return Response.json({
      answer: completion.choices[0].message.content
    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error: "Something went wrong"
      },
      {
        status: 500
      }
    );

  }

}