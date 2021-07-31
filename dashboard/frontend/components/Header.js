import Link from "next/link";
import Image from "next/image";

const Header = () => {
    return (
        <nav className="flex items-center justify-between flex-wrap shadow px-4 py-4">
            <Link href="/" passHref={true}>
                <Image
                    className="opacity-60 cursor-pointer"
                    src="/logo.png"
                    alt="newman dashboard logo"
                    width={300}
                    height={30}
                    quality={100}
                ></Image>
            </Link>
            <button className="bg-red-400 hover:bg-red-500 text-white py-1 px-4 rounded">
                Close
            </button>
        </nav>
    );
};

export default Header;
