import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { prevPrompts, handlePreviousPromptClick, newChat } = useContext(Context);

  return (
    <div className={`sidebar ${extended ? "expanded" : ""}`}>
      {/* 🔹 Top Section */}
      <div className="top">
        <img 
          onClick={() => setExtended((prev) => !prev)} 
          className="menu" 
          src={assets.menu_icon} 
          alt="Menu" 
        />

        {/* 🔹 New Chat Button */}
        <div className="new-chat" onClick={() => { newChat(); handlePreviousPromptClick(""); }}>
          <img src={assets.plus_icon} alt="New Chat" />
          {extended && <p>New Chat</p>}
        </div>

        {/* 🔹 Recent Prompts */}
        {extended && prevPrompts.length > 0 && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div 
                key={index} 
                onClick={() => handlePreviousPromptClick(item)} 
                className="recent-entry"
              >
                <img src={assets.message_icon} alt="Message" />
                <p>{item.length > 18 ? item.slice(0, 18) + "..." : item}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Bottom Section */}
      <div className="bottom">
        <div className="bottom_item recent-entry">
          <img src={assets.question_icon} alt="Help" />
          {extended && <p>Help</p>}
        </div>

        <div className="bottom_item recent-entry">
          <img src={assets.history_icon} alt="Activity" />
          {extended && <p>Activity</p>}
        </div>

        <div className="bottom_item recent-entry">
          <img src={assets.setting_icon} alt="Settings" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
