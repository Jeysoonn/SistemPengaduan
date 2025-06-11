export default function Dashboard () {
  // Data untuk Dashboard Cards
  const data = [
    { title: "Total Sales", value: "$24,000", subtitle: "Since last week" },
    { title: "New Users", value: "180", subtitle: "Since last month" },
    { title: "Total Orders", value: "450", subtitle: "This month" },
  ];

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-semibold">Dashboard Overview</div>
        
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-gray-700 text-xl font-semibold">{card.title}</div>
            <div className="text-3xl font-bold mt-2">{card.value}</div>
            <div className="text-gray-500 mt-4">{card.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
};