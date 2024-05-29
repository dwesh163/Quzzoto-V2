import Head from 'next/head';
import Header from '@/components/header';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Menu from '@/components/menu';

export default function Results() {
	const { data: session, status } = useSession();
	const router = useRouter();

	const [room, setRoom] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch('/api/room/')
			.then((response) => response.json())
			.then((jsonData) => {
				console.log(jsonData);
				if (jsonData.error != 'Not Found' && jsonData.error != 'unauthorized') {
					setRoom(jsonData);
					setIsLoading(false);
				} else {
					setRoom('404');
				}
			});
	}, []);

	return (
		<>
			<Head>
				<title>QuizzotoV2</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Header />
				{isLoading ? (
					<div className="flex md:bg-[#fcfcfc] bg-white flex-col max-w-6xl px-2 mx-auto items-center justify-center md:px-6 lg:px-8 h-[100vh]">
						{room == '404' && <p className="mt-4">Rooms not Found</p>}
						{/* {room == '404' ? (
							<p className="mt-4">Rooms not Found</p>
						) : (
							<svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-sky-500 bg-opacity-90" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
								<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
							</svg>
						)} */}
					</div>
				) : (
					<div className="flex flex-col mt-20 md:bg-[#fcfcfc] bg-white max-w-6xl px-2 mx-auto items-center justify-between md:flex-col md:px-6 lg:px-8">
						<button onClick={() => router.push('/room/create')}>CREATE ROOM</button>
						<div className="relative overflow-x-auto w-full">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
									<tr>
										<th scope="col" className="px-6 py-3">
											Title
										</th>
										<th scope="col" className="px-6 py-3">
											Comment
										</th>
										<th scope="col" className="px-6 py-3">
											Creator
										</th>
										<th scope="col" className="px-6 py-3 sm:flex hidden">
											Time
										</th>
									</tr>
								</thead>
								<tbody>
									{room?.map((room, index) => (
										<tr key={index} className="cursor-pointer hover:bg-slate-100" onClick={() => router.push('/room/' + room.id)}>
											<th scope="row" className="px-6 py-4 font-medium text-gray-900">
												{room.title}
											</th>
											<td className="px-6 py-4">{room.comment}</td>
											<td className="px-6 py-4">{room.user.username}</td>
											<td className="px-6 py-4 sm:flex hidden">{new Date(room.time).toLocaleString('fr-FR')}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</main>
		</>
	);
}
