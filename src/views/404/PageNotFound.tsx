import bgImage from "@/assets/images/404-image.jpg";
import { Button } from "@/components/ui/button";
const PageNotFound = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-white">
      <img
        src={bgImage}
        alt="404 Page Not Found"
        className="w-full h-screen object-cover absolute top-0 left-0 -z-10"
      />
      <Button
        variant="secondary"
        size="lg"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white"
        onClick={() => (window.location.href = "/")}
      >
        Go to Home Page
      </Button>
    </div>
  );
};

export default PageNotFound;
