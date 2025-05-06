import Logo from "/src/assets/logo/fit-track-black.svg";
import { Link } from "react-router";
const FullLogo = () => {
  return (
    <Link
      to={"/"}
      className="flex flex-row justify-center p-1 m-2 mt-3 items-center gap-1"
    >
      <img src={Logo} alt="logo" className="block max-w-20" />
      <span className="text-zinc-900 text-5xl font-extrabold">Fit-Track</span>
    </Link>
  );
};

export default FullLogo;
