
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { User } from "@/lib/types";

interface IndexProps {
  user: User | null;
  logoutUser: () => void;
}

const Index = ({ user, logoutUser }: IndexProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-light-beige">
      <Navbar user={user} logoutUser={logoutUser} />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
