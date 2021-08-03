import Link from "next/link";
import Image from "next/image";
import { socket } from "../pages/_app";

const Header = () => {
    const handleCloseButton = () => {
        if (confirm('Are you sure you want to exit?')) {
            socket.emit("terminate");  
        } 
    };

    return (
        <nav className="flex items-center justify-between flex-wrap shadow px-4 py-4">
            <Link href="/" passHref={true}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className="opacity-60 cursor-pointer"
                    src="/logo.png"
                    alt="newman dashboard logo"
                    width="300"
                    height="30"
                ></img>
            </Link>
            <button
                onClick={handleCloseButton}
                className="bg-red-400 hover:bg-red-500 text-white py-1 px-4 rounded"
            >
                Close
            </button>
        </nav>
    );
};

export default Header;
