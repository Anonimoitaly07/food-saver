
import { cn } from "@/lib/utils";

interface ExpirationBadgeProps {
  date: Date;
  className?: string;
}

const ExpirationBadge = ({ date, className }: ExpirationBadgeProps) => {
  const now = new Date();
  const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  let badgeText: string;
  let badgeStyle: string;
  
  if (diffDays < 0) {
    badgeText = "Expired";
    badgeStyle = "bg-destructive text-destructive-foreground";
  } else if (diffDays <= 3) {
    badgeText = "Expiring Soon";
    badgeStyle = "bg-pastel-orange text-dark-green";
  } else if (diffDays <= 7) {
    badgeText = "Use This Week";
    badgeStyle = "bg-sage text-dark-green";
  } else {
    badgeText = "Fresh";
    badgeStyle = "bg-dark-green text-light-beige";
  }
  
  return (
    <span className={cn(
      "text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap",
      badgeStyle,
      className
    )}>
      {badgeText}
    </span>
  );
};

export default ExpirationBadge;
