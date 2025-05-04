import { deepseekMessage } from "@/app/api/chat";
import { Button, Input } from "@douyinfe/semi-ui";
import { useState } from "react";

export const ChatBox = () => {
  const [message, setMessage] = useState<string[]>([]);
  const getDeepSeekMessage = async () => {
    try {
      const stream = await deepseekMessage();
      const decoder = new TextDecoder();
      let fullMessage = '';

      const reader = stream.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('Stream ended');
          break;
        }
        const chunk = decoder.decode(value, { stream: true });
        fullMessage += chunk;
        setMessage([fullMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <Input/>
      <Button onClick={getDeepSeekMessage}>搜索</Button>
      {message.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
      </div>
  );
};
