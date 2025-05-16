const HowItWorks = () => {
    const steps = [
      {
        icon: "📝",
        title: "Sign Up & Choose Role",
        description: "Create your free account as a Buyer or Worker and set up your profile.",
      },
      {
        icon: "📋",
        title: "Post or Find Tasks",
        description: "Buyers post tasks with clear instructions. Workers browse and pick tasks they like.",
      },
      {
        icon: "💰",
        title: "Submit & Get Paid",
        description: "Workers complete the task, submit proof, and earn coins instantly.",
      },
    ];
  
    return (
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Getting Started is Easy</h2>
          <p className="text-gray-600 mb-12 text-lg">
            Just follow these steps to post or complete tasks and start earning or outsourcing.
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-md transition"
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
  
          <div className="mt-12">
            <a
              href="/register"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;
  