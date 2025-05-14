import * as React from "react";
import { cn } from "@/lib/utils";

interface AlertDialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface AlertDialogContentProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

interface AlertDialogCancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const AlertDialog = ({
  children,
  open,
  onOpenChange
}: AlertDialogProps) => {
  return open ? (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={() => onOpenChange && onOpenChange(false)}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {children}
      </div>
    </>
  ) : null;
};

const AlertDialogContent = ({
  children,
  className,
  ...props
}: AlertDialogContentProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "bg-background relative rounded-lg max-w-lg w-full p-6 shadow-lg",
        className
      )}
      {...props}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

const AlertDialogHeader = ({
  children,
  className,
  ...props
}: AlertDialogHeaderProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("mb-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const AlertDialogFooter = ({
  children,
  className,
  ...props
}: AlertDialogFooterProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("flex justify-end space-x-2 mt-6", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const AlertDialogTitle = ({
  children,
  className,
  ...props
}: AlertDialogTitleProps & React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h2
      className={cn("text-lg font-semibold", className)}
      {...props}
    >
      {children}
    </h2>
  );
};

const AlertDialogDescription = ({
  children,
  className,
  ...props
}: AlertDialogDescriptionProps & React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p
      className={cn("text-sm text-gray-500", className)}
      {...props}
    >
      {children}
    </p>
  );
};

const AlertDialogAction = ({
  children,
  className,
  ...props
}: AlertDialogActionProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const AlertDialogCancel = ({
  children,
  className,
  ...props
}: AlertDialogCancelProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

AlertDialog.displayName = "AlertDialog";
AlertDialogContent.displayName = "AlertDialogContent";
AlertDialogHeader.displayName = "AlertDialogHeader";
AlertDialogFooter.displayName = "AlertDialogFooter";
AlertDialogTitle.displayName = "AlertDialogTitle";
AlertDialogDescription.displayName = "AlertDialogDescription";
AlertDialogAction.displayName = "AlertDialogAction";
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
};
