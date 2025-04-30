'use client';
import { ChatBox } from '@/components/ChatBox/ChatBox';
import { Button, Modal } from '@douyinfe/semi-ui';
import { useState } from 'react';
export async function getServerSideProps() {
  // 在服务器端获取数据
  const initialMessage = 'Hello! How can I assist you today?';
  return { props: { initialMessage } };
}

export default function ChatPage({ initialMessage }: { initialMessage: string }) {
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
    console.log('Ok button clicked');
  };
  const handleCancel = () => {
    setVisible(false);
    console.log('Cancel button clicked');
  };
  const handleAfterClose = () => {
    console.log('After Close callback executed');
  };
  return (
    <div>
      <Button onClick={showDialog}>登录</Button>
      <Modal
        title='基本对话框'
        visible={visible}
        onOk={handleOk}
        afterClose={handleAfterClose}
        onCancel={handleCancel}
        closeOnEsc={true}
      >
        This is the content of a basic modal.
        <br />
        More content...
      </Modal>
      <h1>Chat Page</h1>
      <ChatBox initialMessage={initialMessage} />
    </div>
  );
}
