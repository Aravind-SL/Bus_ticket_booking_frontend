import { ReactElement } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export function Footer(): ReactElement {
    return (
        <footer className="bg-[#f5f6f7]  rounded-lg shadow dark:bg-gray-900 m-0">
            <div className="w-full pl-16 pr-28 mx-0">
                <div className="w-full flex-row  items-center sm:flex sm:items-center sm:justify-between">
                    <a href="/home" className="flex items-center max-sm:items-center rtl:space-x-reverse">
                        <img className='w-36 m-0 max-lg:w-16 py-4 max-sm:px-2 max-sm:w-8/12' src="src\assets\Bus_Logo.png" alt="NexTrip logo" />
                        <span className="self-center max-sm:justify-center text-4xl font-bold whitespace-nowrap max-sm:text-2xl sm:text-2xl dark:text-white">NexTrip</span>
                    </a>
                
                <ul className="flex justify-center items-center gap-10 text-base font-medium text-gray-900 sm:mb-0 max-sm:text-sm max-md:gap-5  dark:text-gray-400">
                    <li>
                        <a href="#" className="hover:text-violet-900 me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="/browse" className="hover:text-violet-900 me-4 md:me-6">Browse</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-violet-900 me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="me-4 md:me-6 hover:text-violet-900">Contact</a>
                    </li>
                </ul>
                </div>
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