import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

let lastRequestTime = 0;
const requestInterval = 1000; // 1 second interval

export async function analyze(input) {
  try {
    console.log("key", import.meta.env.VITE_OPENAI_API_KEY);
    // Check if the time since the last request is less than the interval
    if (Date.now() - lastRequestTime < requestInterval) {
      console.log(
        "Rate limit exceeded. Please wait before making another request.",
      );
      return;
    }

    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
      stream: true,
    });
    let output = "";
    for await (const chunk of stream) {
      output += chunk.choices[0]?.delta?.content || "";
    }
    return output;
  } catch (error) {
    return error.message;
  } finally {
    // Update the last request time to the current time
    lastRequestTime = Date.now();
  }
}
