import Breadcrumb from "../../component/Breadcrumb";

export default function Dashboard() {
  // Data untuk Dashboard Cards
  const data = [
    { title: "Total Sales", value: "$24,000", subtitle: "Since last week" },
    { title: "New Users", value: "180", subtitle: "Since last month" },
    { title: "Total Orders", value: "450", subtitle: "This month" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-900">Tabel Pengaduan</h2>
      <Breadcrumb />

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