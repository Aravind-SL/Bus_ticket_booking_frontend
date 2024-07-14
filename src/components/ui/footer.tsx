import { ReactElement } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import {useLocation} from "react-router-dom";

export function Footer(): ReactElement {
  
  const path = useLocation();
  return (
        <footer hidden={path.pathname === '/auth'} className="py-6 m-0 rounded-lg shadow dark:bg-gray-900">
            <div className="w-full mx-10 max-w-screen-xl md:py-4">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/home" className="flex items-center mb-2 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img className='mb-2 w-14 h-14 md:w-12 ' src="https://img.freepik.com/premium-vector/logo-bus-icon-school-bus-vector-isolated-transport-bus-silhouette-design-black-bus_653669-3055.jpg " alt="BusKaro logo" />
                        <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">Busy Ah!</span>
                    </a>
                </div>
                <ul className="text-base font-medium text-gray-600 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-x-1 sm:gap-y-4 sm:mb-0 dark:text-gray-400">
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

            <hr className="mx-8 max-sm:my-4 border-gray-200 sm:mx-auto dark:border-gray-700" />
            <span className="flex mt-4 justify-center text-base text-gray-600 sm:text-center max-sm:text-sm dark:text-gray-400">© 2024 <a href="/home">&nbsp;NexTrip™</a>. All Rights Reserved.</span>
            <div className="flex justify-center space-x-4 mt-2 py-2 ">
                <a href="#" className="hover:-translate-y-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                    <span className="sr-only">WhatsApp</span>
                    <FaWhatsapp className="w-6 h-6" color='#9e66ff' />
                </a>
                <a href="#" className="hover:-translate-y-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                    <span className="sr-only">Facebook</span>
                    <FaFacebook className="w-6 h-6" color='#9e66ff' />
                </a>
                <a href="#" className="hover:-translate-y-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                    <span className="sr-only">Twitter</span>
                    <FaTwitter className="w-6 h-6" color='#9e66ff' />
                </a>
                <a href="#" className="hover:-translate-y-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                    <span className="sr-only">Instagram</span>
                    <FaInstagram className="w-6 h-6" color='#9e66ff' />
                </a>
               
            </div>
            
        </footer>
    );
}
