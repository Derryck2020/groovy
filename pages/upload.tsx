import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';

import useAuthStore from '../store/authStore';
import { client } from '../utils/client';
import { topics } from '../utils/constants';
import { BASE_URL } from '../utils';

const Upload = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [videoAsset, setVideoAsset] = useState<
		SanityAssetDocument | undefined
	>();
	const [wrongFileType, setWrongFileType] = useState(false);
	const [caption, setCaption] = useState('');
	const [category, setCategory] = useState(topics[0].name);
	const [savingPost, setSavingPost] = useState(false);
	const { userProfile }: { userProfile: any } = useAuthStore();
	const router = useRouter();

	const uploadVideo = async (e: any) => {
		const selectedFile = e.target.files[0];

		const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

		if (fileTypes.includes(selectedFile.type)) {
			client.assets
				.upload('file', selectedFile, {
					contentType: selectedFile.type,
					filename: selectedFile.name,
				})
				.then((data) => {
					setVideoAsset(data);
					setIsLoading(false);
				});
		} else {
			setIsLoading(false);
			setWrongFileType(true);
		}
	};

	const handlePost = async () => {
		if (caption && videoAsset?._id && category) {
			setSavingPost(true);

			const document = {
				_type: 'post',
				caption,
				video: {
					_type: 'file',
					asset: {
						_type: 'reference',
						_ref: videoAsset?._id,
					},
				},
				userId: userProfile?._id,
				postedBy: {
					_type: 'postedBy',
					_ref: userProfile?._id,
				},
				topic: category,
			};

			await axios.post(`${BASE_URL}/api/post`, document);

			router.push('/');
		}
	};

	return (
		<div className="flex w-full h-full absolute left-0 top-[60px] lg:top-[80px] mb-10 pt-10 lg:pt-20 bg-[#dfdfdf] justify-center">
			<div className="bg-white rounded-lg xl:h-[85vh] xl:w-[60%] flex gap-6 flex-wrap justify-center xl:justify-between items-center p-14 pt-6">
				<div>
					<div>
						<p className="text-2xl font-bold">Upload Video</p>
						<p className="text-md text-gray-400 mt-1">
							Post a video to your account
						</p>
					</div>
					<div className="border-dashed rounded-lg border-2 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[400px] p-10 cursor-pointer hover:border-red-500 hover:bg-gray-200">
						{isLoading ? (
							<p>Uploading...before:</p>
						) : (
							<div>
								{videoAsset ? (
									<div>
										<video
											src={videoAsset.url}
											loop
											controls
											className="rounded-xl h-[450px] mt-16 bg-black"
										></video>
									</div>
								) : (
									<label className="cursor-pointer">
										<div className="flex flex-col items-center justify-center h-full">
											<div className="flex flex-col items-center justify-center">
												<p className="font-bold text-xl">
													<FaCloudUploadAlt className="text-gray-300 text-6xl" />
												</p>
												<p className="text-xl font-semibold">
													Choose video
												</p>
											</div>
											<p className="text-gray-400 text-center mt-10 text-sm leading-10">
												MP4 or WebM or ogg <br />
												720x1280 or higher <br />
												Up to 10 minutes <br />
												Less than 1GB
											</p>
											<p className="bg-[#a20ac9] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none ">
												Select File
											</p>
										</div>
										<input
											type="file"
											name="upload-video"
											onChange={uploadVideo}
											className="w-0 h-0"
										/>
									</label>
								)}
							</div>
						)}
						{wrongFileType && (
							<p className="text-center text-xl text-red-500 font-semibold mt-8 w-[250px]">
								Please select a video file
							</p>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-3 pb-10">
					<label className="text-md font-medium">Caption</label>
					<input
						type="text"
						value={caption}
						onChange={(e) => setCaption(e.target.value)}
						className="rounded outline-none text-md border-2 border-gray-200 p-2"
					/>
					<label className="text-md font-medium">Choose a category</label>
					<select
						onChange={(e) => setCategory(e.target.value)}
						className="outline-none border-2 border-gray-200 text-md capitalize p-2 rounded cursor-pointer"
					>
						{topics.map((topic) => (
							<option
								key={topic.name}
								value={topic.name}
								className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
							>
								{topic.name}
							</option>
						))}
					</select>
					<div className="flex gap-6 mt-10">
						<button
							type="button"
							onClick={() => {}}
							className="border-gray-300 border-2 text-md font-medium p-1 rounded w-28 lg:w-44 outline-none"
						>
							Discard
						</button>
						<button
							type="button"
							onClick={() => {
								handlePost();
							}}
							className="bg-[#a20ac9] text-white text-md font-medium p-1 rounded w-28 lg:w-44 outline-none"
						>
							{savingPost ? 'Posting...' : 'Post'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Upload;
