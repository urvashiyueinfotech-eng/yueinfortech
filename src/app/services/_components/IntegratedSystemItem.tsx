import { ReactNode } from "react";

type Props = {
  icon: string | ReactNode;
  title: string;
  description: string;
};

export default function IntegratedSystemItem({ icon, title, description }: Props) {
  return (
    <div className="bg-white p-[28px_24px] transition-colors duration-200 hover:bg-[#EEF0FF]">
      <div className="text-[1.4rem] mb-[12px]">{icon}</div>
      <h4 className="text-[0.95rem] font-extrabold text-[#1E1B4B] mb-[6px]">{title}</h4>
      <p className="text-[0.82rem] text-[#4B5563] leading-[1.6]">{description}</p>
    </div>
  );
}
