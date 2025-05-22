import React, { useState } from "react";

type messageType = {
  content: string;
};

const MessagePage = () => {
  const [content, setContent] = useState<messageType>({ content: "" });

  return;
};

export default MessagePage;
