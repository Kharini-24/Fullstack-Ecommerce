import { useState } from "react";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      setMessage("🎉 Thanks for subscribing!");
      setEmail("");
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium">
        Subscribe Now & get 20% off
      </p>

      <p className="text-gray-400 mt-3">
        Be the first to know about new arrivals and exclusive updates.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>

      {message && (
        <p className="text-sm mt-2 text-green-600">
          {message}
        </p>
      )}
    </div>
  );
};

export default NewsletterBox;
