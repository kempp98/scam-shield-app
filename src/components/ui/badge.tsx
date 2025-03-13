import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Badge variants for different states and uses
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/80",
        secondary: "bg-secondary text-white hover:bg-secondary/80",
        success: "bg-success text-white hover:bg-success/80",
        warning: "bg-warning text-white hover:bg-warning/80", 
        danger: "bg-danger text-white hover:bg-danger/80",
        outline: "text-primary border border-primary hover:bg-primary hover:text-white",
      },
      // Special 'redFlag' variant specifically for highlighting scam red flags
      redFlag: {
        true: "bg-danger/10 text-danger border border-danger cursor-pointer hover:bg-danger/20",
      }
    },
    defaultVariants: {
      variant: "default",
      redFlag: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  tooltip?: string;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, redFlag, tooltip, ...props }, ref) => {
    if (tooltip) {
      return (
        <div className="group relative">
          <div
            ref={ref}
            className={cn(badgeVariants({ variant, redFlag, className }))}
            {...props}
          />
          <div className="absolute z-10 invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 -mt-1 left-1/2 transform -translate-x-1/2 transition-opacity duration-200 opacity-0 group-hover:opacity-100 w-48">
            {tooltip}
          </div>
        </div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, redFlag, className }))}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };