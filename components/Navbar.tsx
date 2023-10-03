import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, GoogleLogout } from '@leecheuk/react-google-login';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

import Logo from '../utils/groovy-logo.png';

const Navbar = () => {
	return (
		<div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-4 px-4">
			<Link href="/">
				<div className="w-[90px] md:w-[130px] -my-2.5">
					<Image
						className="cursor-pointer "
						src={Logo}
						alt="Groovy"
						layout="responsive"
					/>
				</div>
			</Link>
		</div>
	);
};

export default Navbar;
