import axios from "axios";

export async function generateResponse(messages) {
  try {
    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = await axios.post(
      "https://api.openai.com/v1/responses",
      {
        model: "gpt-4.1-mini",
        input: formattedMessages,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            import.meta.env.VITE_OPENAI_API_KEY
          }`,
        },
      }
    );

    return (
      response.data.output?.[0]?.content?.[0]?.text ||
      "No response generated."
    );
  } catch (error) {
    console.error(error);

    return "Something went wrong while generating response.";
  }
}