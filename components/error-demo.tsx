"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useFetch } from "@/hooks/use-fetch";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorMessage } from "@/components/error-message";

export function ErrorDemo() {
	const [showDemo, setShowDemo] = useState(false);
	const [demoUrl, setDemoUrl] = useState("");

	const { data, loading, error } = useFetch(demoUrl);

	const triggerError = () => {
		setShowDemo(true);
		setDemoUrl("https://invalid-url-that-will-fail.com/api/data");
	};

	const triggerSuccess = () => {
		setShowDemo(true);
		setDemoUrl("https://jsonplaceholder.typicode.com/posts/1");
	};

	const resetDemo = () => {
		setShowDemo(false);
		setDemoUrl("");
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="bg-white rounded-xl border border-gray-200 p-6 mt-5"
		>
			<h3 className="text-lg font-semibold text-gray-900 mb-4">
				Error Handling Demo
			</h3>
			<p className="text-gray-600 mb-4">
				Test the error handling capabilities of the application
			</p>

			<div className="flex flex-wrap gap-3 mb-6 mt-3">
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={triggerError}
					className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
				>
					Trigger Error
				</motion.button>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={triggerSuccess}
					className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
				>
					Trigger Success
				</motion.button>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={resetDemo}
					className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
				>
					Reset
				</motion.button>
			</div>

			{showDemo && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: "auto" }}
					exit={{ opacity: 0, height: 0 }}
					transition={{ duration: 0.3 }}
					className=" pt-4 mt-2"
				>
					{loading && (
						<div className="flex items-center space-x-3">
							<LoadingSpinner size="sm" />
							<span className="text-gray-600">Loading data...</span>
						</div>
					)}

					{error && (
						<ErrorMessage message={error} onRetry={() => setDemoUrl(demoUrl)} />
					)}

					{data && !loading && !error && (
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							className="bg-green-50 border border-green-200 rounded-lg p-4"
						>
							<div className="flex items-center">
								<svg
									className="w-5 h-5 text-green-400 mr-3"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
								<span className="text-green-700 font-medium">
									Success! Data loaded successfully.
								</span>
							</div>
						</motion.div>
					)}
				</motion.div>
			)}
		</motion.div>
	);
}
