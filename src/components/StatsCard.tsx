
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FoodItem } from "@/lib/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface StatsCardProps {
  foodItems: FoodItem[];
}

const StatsCard = ({ foodItems }: StatsCardProps) => {
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

  // Data for pie chart
  const data = [
    { name: 'Fresh', value: fresh },
    { name: 'Expiring Soon', value: expiringSoon },
    { name: 'Expired', value: expired },
  ].filter(item => item.value > 0);

  const COLORS = ['#344E41', '#E9C46A', '#E63946'];

  return (
    <Card className="bg-white border-none shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-dark-green">Your Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-sage/10 rounded-xl p-4 text-center">
              <p className="text-sm text-neutral-gray">Items Saved</p>
              <p className="text-3xl font-bold text-dark-green">{totalItems}</p>
            </div>
            <div className="bg-sage/10 rounded-xl p-4 text-center">
              <p className="text-sm text-neutral-gray">Est. Food Saved</p>
              <p className="text-3xl font-bold text-dark-green">{estimatedKgSaved} <span className="text-lg">kg</span></p>
            </div>
          </div>
          
          {totalItems > 0 && (
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
