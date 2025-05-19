
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FoodItem } from "@/lib/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface StatisticsPageProps {
  foodItems: FoodItem[];
}

const StatisticsPage = ({ foodItems }: StatisticsPageProps) => {
  // Calculate statistics
  const totalItems = foodItems.length;
  const estimatedKgSaved = totalItems * 0.5; // Each item is estimated as 0.5kg
  
  // Count items by expiration category
  const now = new Date();
  const expired = foodItems.filter(item => item.expirationDate < now).length;
  const expiringSoon = foodItems.filter(item => {
    const diffDays = Math.ceil((item.expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 3;
  }).length;
  const fresh = totalItems - expired - expiringSoon;
  
  // Group items by month they were added
  const monthlyData = foodItems.reduce((acc: Record<string, number>, item) => {
    const month = item.createdAt.toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  
  const monthlyChartData = Object.entries(monthlyData).map(([month, count]) => ({
    month,
    count
  }));
  
  // Data for pie chart
  const pieData = [
    { name: 'Fresh', value: fresh },
    { name: 'Expiring Soon', value: expiringSoon },
    { name: 'Expired', value: expired },
  ].filter(item => item.value > 0);
  
  const COLORS = ['#344E41', '#E9C46A', '#E63946'];
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-dark-green">Your Food Saving Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-dark-green">Total Items</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-5xl font-bold text-dark-green">{totalItems}</p>
            <p className="text-sm text-neutral-gray mt-2">food items tracked</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-dark-green">Food Saved</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-5xl font-bold text-dark-green">{estimatedKgSaved} <span className="text-2xl">kg</span></p>
            <p className="text-sm text-neutral-gray mt-2">estimated food waste prevented</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-dark-green">Environmental Impact</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-5xl font-bold text-dark-green">{(estimatedKgSaved * 2.5).toFixed(1)}</p>
            <p className="text-sm text-neutral-gray mt-2">kg CO₂ emissions saved</p>
          </CardContent>
        </Card>
      </div>
      
      {totalItems > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white border-none shadow-lg p-4">
            <CardHeader>
              <CardTitle className="text-xl text-dark-green">Food by Expiration Status</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-none shadow-lg p-4">
            <CardHeader>
              <CardTitle className="text-xl text-dark-green">Items Added by Month</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" name="Items" fill="#A3B18A" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
      
      {totalItems === 0 && (
        <Card className="bg-white border-none shadow-lg p-8 text-center">
          <p className="text-neutral-gray">Add some items to your inventory to see your statistics!</p>
        </Card>
      )}
    </div>
  );
};

export default StatisticsPage;
