import Link from "next/link";
import logo from "../../../public/favicon.png";
import Image from "next/image";

export default function Header() {
  return (
    <div className="bg-primary p-2">
      <Link href={"/"}>
        <Image className="w-10 h-10" src={logo} alt="bot logo" />
      </Link>
    </div>
  );
}
