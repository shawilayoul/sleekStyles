const ChiffreSection = () => {
  return (
    <section className="number-features flex flex-wrap justify-around py-12 my-6 bg-gray-50">
      {[
        { value: "15K+", description: "Satisfied Customers" },
        { value: "8+", description: "Years of Experience" },
        { value: "16", description: "Quality Products" },
        { value: "92%", description: "Natural Ingredients" },
      ].map((milestone) => (
        <div className="features-item text-center mb-8" key={milestone.value}>
          <h4 className="text-2xl md:text-3xl font-bold text-green-500">
            {milestone.value}
          </h4>
          <p className="text-gray-600">{milestone.description}</p>
        </div>
      ))}
    </section>
  );
};

export default ChiffreSection;
