
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddItemFormProps {
  addFoodItem: (name: string, expirationDate: Date) => void;
}

const AddItemForm = ({ addFoodItem }: AddItemFormProps) => {
  const [name, setName] = useState("");
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name && expirationDate) {
      addFoodItem(name, expirationDate);
      setName("");
      setExpirationDate(undefined);
      setIsOpen(false);
    }
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-none">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-lg font-medium text-dark-green">Add New Item</h3>
          <p className="text-sm text-neutral-gray">
            Track the food items in your inventory
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2">
            <Label htmlFor="name" className="text-neutral-gray">Food Item Name</Label>
            <Input
              id="name"
              placeholder="e.g., Apples, Milk, Bread"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="expiration-date" className="text-neutral-gray">Expiration Date</Label>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="expiration-date"
                  variant="outline"
                  className={cn(
                    "w-full mt-1 justify-start text-left font-normal",
                    !expirationDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expirationDate ? format(expirationDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={expirationDate}
                  onSelect={(date) => {
                    setExpirationDate(date);
                    setIsOpen(false);
                  }}
                  initialFocus
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-dark-green text-light-beige hover:bg-sage hover:text-dark-green"
          disabled={!name || !expirationDate}
        >
          Add to Inventory
        </Button>
      </form>
    </Card>
  );
};

export default AddItemForm;
