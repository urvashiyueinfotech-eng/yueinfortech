import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast !bg-white !text-slate-900 !border !border-slate-200 shadow-lg",
          description: "!text-slate-600",
          actionButton: "!bg-indigo-600 !text-white",
          cancelButton: "!bg-slate-100 !text-slate-700",
          success: "!bg-emerald-50 !border-emerald-200 !text-emerald-900",
          error: "!bg-rose-50 !border-rose-200 !text-rose-900",
          warning: "!bg-amber-50 !border-amber-200 !text-amber-900",
          info: "!bg-sky-50 !border-sky-200 !text-sky-900",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
