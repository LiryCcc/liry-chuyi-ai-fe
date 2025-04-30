import { sendMessage } from '@/lib/deepseek';
import { useEffect, useState } from 'react';

export const ChatBox = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const handleSend = async () => {
    if (input.trim() === '') return;

    // 添加用户消息
    setMessages((prev) => [...prev, input]);

    // 调用 DeepSeek API 获取回复
    const response = await sendMessage(input);
    setMessages((prev) => [...prev, response]);

    setInput('');
  };

  useEffect(() => {
    // 检查登录状态
    const sessionToken = cookies().get('session-token');
    if (!sessionToken) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <input type='text' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type your message' />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};
