import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, onCheckedChange, checked, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(event.target.checked);
      }
    };

    return (
      <div
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
          checked ? "bg-primary" : "bg-input",
          className
        )}
        onClick={() => onCheckedChange?.(!checked)}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 rounded-full bg-background shadow-md transform transition-transform",
            checked ? "translate-x-5" : "translate-x-1"
          )}
        />
        <input
          type="checkbox"
          className="sr-only"
          onChange={handleChange}
          checked={checked}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
