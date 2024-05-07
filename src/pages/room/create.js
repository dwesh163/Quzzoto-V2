import Head from 'next/head';
import Header from '@/components/header';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Menu from '@/components/menu';

export default function Results() {
	const { data: session, status } = useSession();
	const router = useRouter();

	const [title, setTitle] = useState('');
	const [comment, setComment] = useState('');
	const [slug, setSlug] = useState('');
	const [quizzes, setQuizzes] = useState([{ title: 'test' }]);
	const [url, setUrl] = useState('');
	const [error, setError] = useState('');

	function createRoom(params) {
		fetch('/api/room/', { method: 'POST', body: JSON.stringify({ title: title, comment: comment, slug: slug }) })
			.then((response) => response.json())
			.then((jsonData) => {
				if (!jsonData.error) {
					router.push('/room/' + jsonData.id);
				} else {
					setError(jsonData.error);
				}
			});
	}

	useEffect(() => {
		if (window && router) {
			setUrl(window.location.href.replace(router.pathname, ''));
		}
	}, [router]);

	return (
		<>
			<Head>
				<title>QuizzotoV2</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Header />
				<div className="flex flex-col mt-20 md:bg-[#fcfcfc] bg-white max-w-6xl px-2 mx-auto items-center justify-between md:flex-col md:px-6 lg:px-8">
					<h3 className="text-3xl mt-3 font-bold text-black text-left w-full">Info</h3>
					<div className="flex w-full gap-5 pt-3 sm:flex-row flex-col">
						<div className="relative w-full min-w-[200px] h-10">
							<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500" placeholder=" " />
							<label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">Room Title</label>
						</div>

						<div className="relative w-full min-w-[200px] h-10">
							<input type="text" value={comment} onChange={(e) => setComment(e.target.value)} className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500" placeholder=" " />
							<label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">Room comment</label>
						</div>
					</div>
					<div className="w-full flex mt-3">
						<div className="w-[15rem] flex items-center">
							<p className="w-full">{url}/r/</p>
						</div>

						<div className="relative w-full min-w-[200px] h-10">
							<input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className={'peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 ' + (error ? 'focus:border-red-500 border-red-500' : 'focus:border-blue-500')} placeholder=" " />
							{error && (
								<p class="flex items-center gap-1 mt-2 font-sans text-sm antialiased font-normal leading-normal text-red-500">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4468" class="w-4 h-4 -mt-px">
										<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"></path>
									</svg>
									{error}
								</p>
							)}
						</div>
					</div>
					<h3 className="text-3xl mt-3 font-bold text-black text-left w-full">Quizzes</h3>
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead className="sm:text-base text-sm text-gray-900 uppercase dark:text-gray-400">
							<tr>
								<th scope="col" className="sm:px-6 px-0 sm:py-3 py-1">
									Title
								</th>
							</tr>
						</thead>
						<tbody className="w-full">
							{quizzes?.map((quiz, index) => (
								<tr key={'quizzes-' + index} className="sm:text-base text-sm cursor-pointer hover:bg-slate-100" onClick={() => router.push('/quiz/' + quiz.slug)}>
									<th scope="row" className="sm:px-6 sm:py-4 px-3 py-2 font-medium text-gray-900 hidden sm:table-cell">
										{quiz.title}
									</th>
								</tr>
							))}
						</tbody>
					</table>
					<button onClick={() => createRoom()} type="button" className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-sky-500 dark:hover:bg-sky-600 focus:outline-none dark:focus:ring-sky-800">
						Create room
					</button>
				</div>
			</main>
		</>
	);
}
