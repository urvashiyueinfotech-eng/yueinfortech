import Hero from "../sections/HomePage/Hero";

type HeaderWrapperProps = {
  heroEyebrow?: string;
  heroHeading?: string;
};

const HeaderWrapper = ({ heroEyebrow, heroHeading }: HeaderWrapperProps) => {
  return (
    <header className="relative">
      <Hero heroEyebrow={heroEyebrow} heroHeading={heroHeading} />
    </header>
  );
};

export default HeaderWrapper;
