import axiosInstance from '@/lib/axios';

interface IModelItem {
  id: string;
  object: string;
  owned_by: number;
}

const getModels = async (): Promise<IModelItem[]> => {
  const res = await axiosInstance('/models', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return res.data as IModelItem[];
};
const deepseekMessage = async () => {
  const res = await axiosInstance('/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    },
    data: {
      messages: [
        {
          content: 'You are a helpful assistant',
          role: 'system'
        },
        {
          content: 'Hi',
          role: 'user'
        }
      ],
      model: 'deepseek-chat',
      frequency_penalty: 0,
      max_tokens: 2048,
      presence_penalty: 0,
      response_format: {
        type: 'text'
      },
      stop: null,
      stream: true,
      stream_options: null,
      temperature: 1,
      top_p: 1,
      tools: null,
      tool_choice: 'none',
      logprobs: false,
      top_logprobs: null
    },
    responseType: 'stream'
  });
  console.log('gb123resdata', res, res.data);
  return res;
};

export { deepseekMessage, getModels };
