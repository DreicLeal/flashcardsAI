import Link from "next/link";
import logo from "../../../public/favicon.png";
import Image from "next/image";

export default function Header() {
  return (
    <div className="bg-primary">
      <Link href={"/"}>
        <Image width={45} height={45} src={logo} alt="bot logo" />
      </Link>
    </div>
  );
}
