import axios from "axios";

export async function generateResponse(messages, lines = "manual") {
  try {
    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    let systemContent = "You are a helpful AI assistant. Respond naturally and conversationally.";
    let maxTokens = 2000;
    let lineInstruction = "";
    
    if (lines !== "manual") {
      const lineCount = Number(lines);
      
      // Map line counts to token limits to enforce constraints
      const tokenMap = {
        1: 150,
        3: 300,
        5: 500,
        9: 900,
      };
      
      maxTokens = tokenMap[lineCount] || 2000;
      lineInstruction = `\n\nIMPORTANT: Your response MUST be EXACTLY ${lineCount} line(s). Each line should be a separate thought or sentence. Do not exceed ${lineCount} lines.`;
      systemContent = `You are a helpful AI assistant. You will respond in EXACTLY ${lineCount} line(s). Each line must be a complete sentence or thought. Be concise and direct.${lineInstruction}`;
    }

    // Add line instruction to the last user message
    let messagesWithInstruction = [...formattedMessages];
    if (lines !== "manual" && messagesWithInstruction.length > 0) {
      const lastMessage = messagesWithInstruction[messagesWithInstruction.length - 1];
      if (lastMessage.role === "user") {
        messagesWithInstruction[messagesWithInstruction.length - 1] = {
          ...lastMessage,
          content: lastMessage.content + lineInstruction,
        };
      }
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemContent,
          },
          ...messagesWithInstruction,
        ],
        temperature: 0.5,
        max_tokens: maxTokens,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
    );

    let responseText =
      response.data.choices?.[0]?.message?.content ||
      "No response generated.";

    // Post-process to trim to exact line count
    if (lines !== "manual") {
      const lineCount = Number(lines);
      const responseLines = responseText
        .split("\n")
        .filter((line) => line.trim().length > 0)
        .slice(0, lineCount);
      responseText = responseLines.join("\n");
    }

    return responseText;
  } catch (error) {
    console.error(error);
    return "Something went wrong while generating response.";
  }
}