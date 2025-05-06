import Logo from "/src/assets/logo/fit-track.svg";
import { Link } from "react-router";
const FullLogo = () => {
  return (
    <Link
      to={"/"}
      className="flex flex-row justify-center p-1 m-2 mt-3 items-center gap-1"
    >
      <img src={Logo} alt="logo" className="block max-w-10" />
      <span className="text-yellow-400 text-2xl font-extrabold">Fit-Track</span>
    </Link>
  );
};

export default FullLogo;
