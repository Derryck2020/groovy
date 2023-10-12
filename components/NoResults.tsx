import React from 'react';
import { NextPage } from 'next';
import { MdOutlineVideocamOff } from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi';

interface Iprops {
	text: string;
}

const NoResults: NextPage<Iprops> = ({ text }) => {
	return (
		<div className="flex flex-col justify-center items-center h-full w-full">
			<p className="text-8xl">
				{text === 'No comments yet! Be first to comment.' ? (
					<BiCommentX />
				) : (
					<MdOutlineVideocamOff />
				)}
			</p>
			<p className="text-center text-[#666666]">{text}</p>
		</div>
	);
};

export default NoResults;
