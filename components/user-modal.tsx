"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	phone: string;
	website: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
	};
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
}

interface UserModalProps {
	user: User;
	onClose: () => void;
}

export function UserModal({ user, onClose }: UserModalProps) {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscape);
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [onClose]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={onClose}
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.9, y: 20 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.9, y: 20 }}
				onClick={(e) => e.stopPropagation()}
				className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
			>
				<div className="p-6">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-bold text-gray-900">User Details</h2>
						<button
							onClick={onClose}
							className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					<div className="space-y-6">
						{/* Personal Information */}
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-3">
								Personal Information
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Full Name
									</label>
									<p className="text-gray-900">{user.name}</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Username
									</label>
									<p className="text-gray-900">@{user.username}</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Email
									</label>
									<p className="text-gray-900">{user.email}</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Phone
									</label>
									<p className="text-gray-900">{user.phone}</p>
								</div>
								<div className="md:col-span-2">
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Website
									</label>
									<p className="text-blue-600 hover:text-blue-700">
										<a
											href={`https://${user.website}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											{user.website}
										</a>
									</p>
								</div>
							</div>
						</div>

						{/* Address */}
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-3">
								Address
							</h3>
							<div className="bg-gray-50 p-4 rounded-lg">
								<p className="text-gray-900">
									{user.address.suite} {user.address.street}
								</p>
								<p className="text-gray-900">
									{user.address.city}, {user.address.zipcode}
								</p>
							</div>
						</div>

						{/* Company */}
						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-3">
								Company
							</h3>
							<div className="bg-gray-50 p-4 rounded-lg space-y-2">
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Company Name
									</label>
									<p className="text-gray-900 font-medium">
										{user.company.name}
									</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Catch Phrase
									</label>
									<p className="text-gray-900 italic">
										"{user.company.catchPhrase}"
									</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Business
									</label>
									<p className="text-gray-900">{user.company.bs}</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex justify-end gap-2 space-x-3 pt-6 border-t mb-2 border-gray-200">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={onClose}
							className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
						>
							Close
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							Edit User
						</motion.button>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
