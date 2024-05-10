import React, { useEffect } from 'react';

const Chat = () => {
    useEffect(() => {
        (function (d, m) {
            var kommunicateSettings = {
                "appId": "119eeeca19ad173f3de3c02219bde6910",
                "popupWidget": true,
                "automaticChatOpenOnNavigation": true,
                "clearChatOnFirstTimeUser": true // Add this property to clear chat history
            };
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0];
            h.appendChild(s);
            window.kommunicate = m;
            m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    }, []);

    return (
        <div className='root'></div>
    );
}

export default Chat;
