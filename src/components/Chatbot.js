import * as React from "react";
import style from "../styles/chatbot.module.css";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

function Chatbot() {
  const [message, setMessage] = React.useState("");
  const [isMsgVisible, setIsMsgVisible] = React.useState(false);
  const [isBotVisible, setIsBotVisible] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { msg: "Hi, how may I help you?", tag: "bot" },
  ]);

  React.useEffect(() => {
    let isMounted = true;
    const effect = () => {
      setTimeout(() => {
        if (isMounted) setIsMsgVisible(() => true);
      }, 1000);
    };

    effect();
    return () => {
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    const effect = () => {
      const elem = document.getElementById("body");
      if (elem && elem.scrollHeight > elem.offsetHeight) {
        elem.scrollTop = elem.scrollHeight;
      }
    };
    return effect();
  }, [messages, isMsgVisible]);

  //   const msg = useSelector((state) => state.chatbot.message);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message || message.length < 2) return;
    setIsMsgVisible(() => false);

    const res = await axios.post(
      `${process.env.REACT_APP_CHATBOT_API}/${message}`
    );

    setMessages(() => [
      ...messages,
      { msg: message, tag: "user" },
      { msg: res.data.message || "bye!", tag: "bot" },
    ]);
    setMessage(() => "");

    setTimeout(() => {
      setIsMsgVisible(() => true);
    }, 1000);
  };

  return (
    <>
      <div
        className={style.chatbot}
        data-tooltip="chat with foodo"
        onClick={() => setIsBotVisible(() => true)}
      >
        <MarkChatUnreadIcon />
      </div>

      {isBotVisible ? (
        <div className={style.container}>
          <div className={style.header}>
            <span>Foodo</span>

            <span>
              <CancelIcon
                onClick={(e) => setIsBotVisible(() => false)}
                sx={{ cursor: "pointer" }}
              />
            </span>
          </div>
          <div className={style.body} id="body">
            {messages.map(({ msg, tag }, index) =>
              tag === "bot" ? (
                <div key={index} className={style.bot_msg}>
                  {!isMsgVisible && index === messages.length - 1 ? (
                    <div className={style.chatbot_ticontainer}>
                      <div className={style.chatbot_tiblock}>
                        <div className={style.chatbot_tidot} />
                        <div className={style.chatbot_tidot} />
                        <div className={style.chatbot_tidot} />
                      </div>
                    </div>
                  ) : (
                    msg
                  )}
                </div>
              ) : (
                <div key={index} className={style.user_msg}>
                  {msg}
                </div>
              )
            )}

            <div id="scrollerHelper"></div>
          </div>
          <form className={style.textbox} onSubmit={handleSubmit}>
            <div className={style.msgBox}>
              <input
                autoFocus={true}
                placeholder="Type your message here..."
                type="text"
                value={message}
                onChange={(e) => setMessage(() => e.target.value)}
              />
            </div>
            <div className={style.sendButton} onClick={handleSubmit}>
              <IconButton>
                <SendIcon sx={{ color: "#d23f57" }} />
              </IconButton>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default Chatbot;
