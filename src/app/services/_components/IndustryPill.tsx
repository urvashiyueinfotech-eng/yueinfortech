type Props = {
  name: string;
};

export default function IndustryPill({ name }: Props) {
  return (
    <span className="bg-white border-[1.5px] border-[#E5E7EB] text-[#4B5563] text-[0.82rem] font-semibold py-[9px] px-[20px] rounded-full transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-[#5B4FE9] hover:text-[#5B4FE9] hover:shadow-[0_4px_16px_rgba(91,79,233,0.12)]">
      {name}
    </span>
  );
}
