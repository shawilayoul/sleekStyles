const ChiffreSection = () => {
  return (
    <section className="number-features flex flex-wrap justify-around py-12 my-6 bg-gray-50">
      {[
        { value: "15K+", description: "Satisfied Customers" },
        { value: "8+", description: "Years of Experience" },
        { value: "16", description: "Product Range" },
        { value: "92%", description: "Sustainability" },
      ].map((milestone) => (
        <div
          className="features-item text-center mb-8 w-1/2 md:w-auto"
          key={milestone.value}
        >
          <h4 className="text-3xl md:text-5xl font-bold text-green-500">
            {milestone.value}
          </h4>
          <p className="text-gray-600 text-sm md:text-base">
            {milestone.description}
          </p>
        </div>
      ))}
    </section>
  );
};

export default ChiffreSection;
