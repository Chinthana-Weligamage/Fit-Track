import { motion } from "framer-motion";
import HeroImage from "@/assets/images/yogapose.png";
import HeroText from "@/assets/images/caption.png";
import FullLogo from "@/components/logo/FullLogoBlack";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="bg-yellow-400 w-full h-screen flex flex-col md:flex-row justify-center items-center p-5 gap-3 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-3 justify-center items-start -mr-20 pl-12"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FullLogo />
        </motion.div>
        <motion.img
          src={HeroText}
          alt=""
          className="object-contain ml-5 mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
        <motion.div
          className="grid grid-cols-2 gap-1 ml-5 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              size={"lg"}
              className="bg-white text-black font-bold py-3 px-5 rounded-full shadow-lg hover:shadow-xl transition duration-300"
            >
              Create Account
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              size={"lg"}
              className="bg-black text-white font-bold py-3 px-5 rounded-full shadow-lg hover:shadow-xl transition duration-300"
            >
              Login to Fit-Track!
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <img src={HeroImage} alt="" className="w-full object-contain" />
      </motion.div>
    </div>
  );
};

export default HomePage;
