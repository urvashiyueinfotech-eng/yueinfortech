type Props = {
  number: string;
  label: string;
  title: string;
  description: string;
  isLast?: boolean;
};

export default function WhyChooseUsStep({ number, label, title, description, isLast = false }: Props) {
  return (
    <div className={`flex gap-[20px] relative group ${!isLast ? 'pb-[28px]' : ''}`}>
      <div className="flex flex-col items-center shrink-0">
        <div className="w-[48px] h-[48px] rounded-full border-2 border-[#5B4FE9] bg-white flex items-center justify-center text-[0.8rem] font-extrabold text-[#5B4FE9] z-10">
          {number}.
        </div>
        {!isLast && (
          <div className="w-[2px] bg-gradient-to-b from-[#5B4FE9] to-[rgba(91,79,233,0.08)] flex-1 my-[4px]" />
        )}
      </div>
      <div className="bg-white rounded-[16px] p-[18px_20px] shadow-[0_4px_24px_rgba(91,79,233,0.08)] border border-[rgba(91,79,233,0.08)] flex-1">
        <div className="text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#5B4FE9] mb-[4px]">{label}</div>
        <h3 className="text-[0.97rem] font-extrabold text-[#1E1B4B] mb-[5px]">{title}</h3>
        <p className="text-[0.83rem] text-[#4B5563] leading-[1.6]">{description}</p>
      </div>
    </div>
  );
}
