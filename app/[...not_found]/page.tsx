import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";

export default function NotFound() {
  return (
    <div>
      <h1>Not found – 404!</h1>
      <div>
        <Link className="flex items-center gap-2" href="/">
          <MdOutlineArrowBack size={16} />
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
