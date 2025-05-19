
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ExpirationBadge from "@/components/ExpirationBadge";
import { FoodItem } from "@/lib/types";

interface InventoryListProps {
  foodItems: FoodItem[];
  deleteFoodItem: (id: string) => void;
}

const InventoryList = ({ foodItems, deleteFoodItem }: InventoryListProps) => {
  const [sortField, setSortField] = useState<"name" | "expirationDate">("expirationDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Sort the food items
  const sortedItems = [...foodItems].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortDirection === "asc"
        ? a.expirationDate.getTime() - b.expirationDate.getTime()
        : b.expirationDate.getTime() - a.expirationDate.getTime();
    }
  });

  const toggleSort = (field: "name" | "expirationDate") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-dark-green">Your Food Inventory</h2>
        <div className="flex space-x-2 text-sm">
          <button
            onClick={() => toggleSort("name")}
            className={`px-2 py-1 rounded ${
              sortField === "name"
                ? "bg-sage/30 text-dark-green"
                : "text-neutral-gray hover:bg-sage/10"
            }`}
          >
            Sort by Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
          </button>
          <button
            onClick={() => toggleSort("expirationDate")}
            className={`px-2 py-1 rounded ${
              sortField === "expirationDate"
                ? "bg-sage/30 text-dark-green"
                : "text-neutral-gray hover:bg-sage/10"
            }`}
          >
            Sort by Expiry {sortField === "expirationDate" && (sortDirection === "asc" ? "↑" : "↓")}
          </button>
        </div>
      </div>

      {sortedItems.length === 0 ? (
        <div className="text-center py-10 text-neutral-gray">
          <p>Your inventory is empty. Add some items to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedItems.map((item) => (
            <Card key={item.id} className="p-4 border-none shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-dark-green">{item.name}</h3>
                  <p className="text-sm text-neutral-gray">
                    Expires: {item.expirationDate.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <ExpirationBadge date={item.expirationDate} />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteFoodItem(item.id)}
                    className="text-neutral-gray hover:text-destructive hover:bg-destructive/10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryList;
