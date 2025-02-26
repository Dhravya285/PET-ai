import { useState } from "react";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5001/api/chatbot/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            if (!res.ok) throw new Error("Failed to fetch response");
            
            const data = await res.json();
            const botMessage = { sender: "bot", text: data.reply || "Sorry, I couldn't understand that." };

            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error("Chatbot API error:", error);
            setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Error: Unable to connect to AI." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-96 p-4 border rounded shadow-lg bg-white">
            <h2 className="text-lg font-semibold">Pet Adoption AI Chatbot</h2>
            <div className="h-60 overflow-auto my-2 border p-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 my-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                        <span className={`px-3 py-1 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                            {msg.text}
                        </span>
                    </div>
                ))}
                {loading && <div className="text-gray-500 text-sm">AI is typing...</div>}
            </div>
            <div className="flex">
                <input
                    className="flex-grow border p-2 rounded"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about pet adoption..."
                    disabled={loading}
                />
                <button 
                    className={`ml-2 p-2 rounded ${loading ? "bg-gray-400" : "bg-blue-500 text-white"}`} 
                    onClick={sendMessage} 
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send"}
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
