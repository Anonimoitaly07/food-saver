
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-green text-center mb-12">
          Why Choose Food Saver?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
            <div className="h-3 bg-dark-green"></div>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-dark-green mb-3">Easy Food Tracking</h3>
              <p className="text-neutral-gray">
                Our simple interface makes it easy to add, update, and remove items from your food inventory.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
            <div className="h-3 bg-sage"></div>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-dark-green mb-3">Reduce Food Waste</h3>
              <p className="text-neutral-gray">
                Get notified when food is nearing expiration so you can use it before it's too late.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
            <div className="h-3 bg-pastel-orange"></div>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-dark-green mb-3">Save Money</h3>
              <p className="text-neutral-gray">
                Keep track of what you have to avoid unnecessary purchases and duplicate items.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
            <div className="h-3 bg-pastel-orange"></div>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-dark-green mb-3">Recipe Suggestions</h3>
              <p className="text-neutral-gray">
                Get creative recipe ideas based on what's in your inventory.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
            <div className="h-3 bg-dark-green"></div>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-dark-green mb-3">Environmental Impact</h3>
              <p className="text-neutral-gray">
                Track your contribution to reducing food waste and its environmental impact.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
            <div className="h-3 bg-sage"></div>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-dark-green mb-3">User-Friendly Interface</h3>
              <p className="text-neutral-gray">
                Simple, intuitive design makes food management a breeze.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-xl text-dark-green">
            Join thousands of users who are already saving food, money, and the planet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
