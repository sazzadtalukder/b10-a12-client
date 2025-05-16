import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How do I earn coins?",
    answer:
      "You can earn coins by completing micro-tasks listed on the platform. Once your submission is approved by the buyer, coins will be added to your account.",
  },
  {
    question: "What is the withdrawal process?",
    answer:
      "You can withdraw your coins once you have a minimum of 200 coins. Go to your dashboard → Withdrawals, fill the form, and submit your request.",
  },
  {
    question: "How do I create a task as a buyer?",
    answer:
      "Login as a buyer and go to the 'Add New Task' section on your dashboard. Fill out the required fields and submit the task after ensuring you have enough coins.",
  },
  {
    question: "What happens if my submission gets rejected?",
    answer:
      "If a buyer rejects your submission, you'll receive a notification. The task slot becomes available again, and you can try a different task.",
  },
  {
    question: "How do I become a developer for this platform?",
    answer:
      "Click the 'Join as Developer' button in the Navbar. It will redirect you to the GitHub repository where you can contribute or fork the project.",
  },
];

const FAQItem = ({ faq, isOpen, onClick }) => (
  <div className="border-b py-3">
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full text-left font-medium text-lg"
    >
      <span>{faq.question}</span>
      {isOpen ? <ChevronUp /> : <ChevronDown />}
    </button>
    {isOpen && <p className="mt-2 text-gray-600">{faq.answer}</p>}
  </div>
);

const QuickHelpFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto py-12 px-4 md:px-6">
      <h2 className="text-3xl font-bold mb-6 text-center">❓ Quick Help & FAQs</h2>
      <p className="text-center text-gray-600 mb-8">
        Find answers to the most common questions from workers and buyers.
      </p>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default QuickHelpFAQ;
