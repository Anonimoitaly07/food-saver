
import { useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { User } from "@/lib/types";
import Sidebar from "@/components/Sidebar";
import InventoryList from "@/components/InventoryList";
import AddItemForm from "@/components/AddItemForm";
import RecipeSuggestions from "@/components/RecipeSuggestions";
import StatsCard from "@/components/StatsCard";
import RecipesPage from "@/components/RecipesPage";
import StatisticsPage from "@/components/StatisticsPage";
import { toast } from "@/hooks/use-toast";

interface DashboardProps {
  user: User;
  logoutUser: () => void;
}

const Dashboard = ({ user, logoutUser }: DashboardProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Food items state with localStorage persistence
  const [foodItems, setFoodItems] = useState(() => {
    const savedItems = localStorage.getItem('foodItems');
    if (savedItems) {
      try {
        // Convert date strings back to Date objects
        const parsed = JSON.parse(savedItems);
        return parsed.map((item: any) => ({
          ...item,
          expirationDate: new Date(item.expirationDate),
          createdAt: new Date(item.createdAt)
        }));
      } catch (e) {
        console.error("Error parsing stored items:", e);
        return [];
      }
    }
    return [];
  });

  // Save items to localStorage whenever they change
  useState(() => {
    localStorage.setItem('foodItems', JSON.stringify(foodItems));
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const addFoodItem = (name: string, expirationDate: Date) => {
    const newItem = {
      id: Date.now().toString(),
      name,
      expirationDate,
      createdAt: new Date(),
      userId: user.id
    };
    
    const updatedItems = [...foodItems, newItem];
    setFoodItems(updatedItems);
    localStorage.setItem('foodItems', JSON.stringify(updatedItems));
    
    toast({
      title: "Item Added",
      description: `${name} has been added to your inventory.`,
    });
  };

  const deleteFoodItem = (id: string) => {
    const updatedItems = foodItems.filter(item => item.id !== id);
    setFoodItems(updatedItems);
    localStorage.setItem('foodItems', JSON.stringify(updatedItems));
    
    toast({
      title: "Item Deleted",
      description: "The item has been removed from your inventory.",
    });
  };

  return (
    <div className="flex h-screen bg-light-beige">
      <Sidebar 
        user={user} 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        logoutUser={logoutUser} 
      />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'} overflow-y-auto`}>
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-2/3">
                      <h1 className="text-2xl font-bold text-dark-green mb-6">Food Inventory</h1>
                      <AddItemForm addFoodItem={addFoodItem} />
                      <InventoryList 
                        foodItems={foodItems} 
                        deleteFoodItem={deleteFoodItem} 
                      />
                    </div>
                    <div className="w-full md:w-1/3 space-y-6">
                      <StatsCard foodItems={foodItems} />
                      <RecipeSuggestions foodItems={foodItems} />
                    </div>
                  </div>
                </div>
              } 
            />
            <Route 
              path="/inventory" 
              element={
                <div className="space-y-8">
                  <h1 className="text-2xl font-bold text-dark-green">Your Food Inventory</h1>
                  <AddItemForm addFoodItem={addFoodItem} />
                  <InventoryList foodItems={foodItems} deleteFoodItem={deleteFoodItem} />
                </div>
              } 
            />
            <Route 
              path="/recipes" 
              element={<RecipesPage foodItems={foodItems} />} 
            />
            <Route 
              path="/statistics" 
              element={<StatisticsPage foodItems={foodItems} />} 
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
