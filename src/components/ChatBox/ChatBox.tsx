import { deepseekMessage } from '@/app/api/chat';
import { Button, Input } from '@douyinfe/semi-ui';
import { useState } from 'react';

export const ChatBox = () => {
  const [message, setMessage] = useState<string[]>([]);
  const getDeepSeekMessage = async () => {
    try {
      const response = await deepseekMessage();
      if (!response.body) {
        throw new Error('No response body');
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullMessage = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('Stream ended');
          break;
        }
        const chunk = decoder.decode(value, { stream: true });
        // 解析每个块并提取内容
        chunk.split('\n').forEach((line) => {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') return;
            try {
              const json = JSON.parse(data);
              if (json.choices[0].delta.content) {
                fullMessage += json.choices[0].delta.content;
                setMessage([fullMessage]);
              }
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
          }
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <Input />
      <Button onClick={getDeepSeekMessage}>搜索</Button>
      {message.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div>
  );
};
