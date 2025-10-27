import { useState } from "react";
import axios from "axios";

const CommentForm = () => {
  const [name, setName] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Sending the comment to the API, which will forward it to the Telegram bot
      await axios.post("/api/send-comment", { name, telegramUsername, comment });
      alert("Comment submitted successfully!");
      setName("");
      setTelegramUsername("");
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Your Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
        />
      </div>
      <div>
        <label htmlFor="telegramUsername">Your Telegram Username:</label>
        <input
          id="telegramUsername"
          type="text"
          value={telegramUsername}
          onChange={(e) => setTelegramUsername(e.target.value)}
          placeholder="Your Telegram Username"
          required
        />
      </div>
      <div>
        <label htmlFor="comment">Your Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your Comment"
          required
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
