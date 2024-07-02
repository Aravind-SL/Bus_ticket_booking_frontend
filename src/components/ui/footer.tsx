import { ReactElement } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaDiscord } from 'react-icons/fa';

export function Footer(): ReactElement {
    return (
        <footer className="rounded-lg shadow dark:bg-gray-900 m-0">
            <div className="w-full max-w-screen-xl mx-10 md:py-4">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/home" className="flex items-center mb-2 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img className='w-14 h-14 md:w-12 mb-2 ' src="https://img.freepik.com/premium-vector/logo-bus-icon-school-bus-vector-isolated-transport-bus-silhouette-design-black-bus_653669-3055.jpg " alt="BusKaro logo" />
                        <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">BusKaro</span>
                    </a>
                </div>
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-x-1 sm:gap-y-4 text-base font-medium text-gray-600 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="/browse" className="hover:underline me-0 md:me-4">Browse</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>


            {/* social media icons */}

            <hr className="mx-12 my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
            <span className="block text-sm text-gray-600 sm:text-center dark:text-gray-400">© 2024 <a href="/home" className="hover:underline">BusKaro™</a>. All Rights Reserved.</span>
            <div className="flex justify-center space-x-4 mt-5">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                    <span className="sr-only">Facebook</span>
                    <FaFacebook className="w-6 h-6" color='#9e66ff' />
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                    <span className="sr-only">Twitter</span>
                    <FaTwitter className="w-6 h-6" color='#9e66ff' />
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                    <span className="sr-only">Instagram</span>
                    <FaInstagram className="w-6 h-6" color='#9e66ff' />
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                    <span className="sr-only">Github</span>
                    <FaGithub className="w-6 h-6"  color='#9e66ff'/>
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                    <span className="sr-only">Discord</span>
                    <FaDiscord className="w-6 h-6" color='#9e66ff'/>
                </a>
            </div>
            
        </footer>
    );
}