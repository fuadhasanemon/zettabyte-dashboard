"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFetch } from "@/hooks/use-fetch";
import { Card } from "@/components/card";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorMessage } from "@/components/error-message";
import { UserModal } from "@/components/user-modal";
import { PageTransition } from "@/components/page-transition";

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

export default function UsersPage() {
	const {
		data: users,
		loading,
		error,
		refetch,
	} = useFetch<User[]>("https://jsonplaceholder.typicode.com/users");
	const [selectedUser, setSelectedUser] = useState<User | null>(null);

	if (loading) {
		return (
			<PageTransition>
				<div className="space-y-6">
					<h1 className="text-3xl font-bold text-gray-900">Users</h1>
					<div className="flex justify-center py-12">
						<LoadingSpinner size="lg" />
					</div>
				</div>
			</PageTransition>
		);
	}

	if (error) {
		return (
			<PageTransition>
				<div className="space-y-6">
					<h1 className="text-3xl font-bold text-gray-900">Users</h1>
					<ErrorMessage message={error} onRetry={refetch} />
				</div>
			</PageTransition>
		);
	}

	return (
		<PageTransition>
			<div className="space-y-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Users</h1>
					<p className="text-gray-600 mb-6">
						Manage user accounts and view details
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
				>
					<Card>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b border-gray-200">
										<th className="text-left py-3 px-4 font-semibold text-gray-900">
											Name
										</th>
										<th className="text-left py-3 px-4 font-semibold text-gray-900">
											Username
										</th>
										<th className="text-left py-3 px-4 font-semibold text-gray-900">
											Email
										</th>
										<th className="text-left py-3 px-4 font-semibold text-gray-900">
											Company
										</th>
										<th className="text-left py-3 px-4 font-semibold text-gray-900">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{users?.map((user, index) => (
										<motion.tr
											key={user.id}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.5, delay: index * 0.1 }}
											onClick={() => setSelectedUser(user)}
											className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
										>
											<td className="py-4 px-4">
												<div className="font-medium text-gray-900">
													{user.name}
												</div>
											</td>
											<td className="py-4 px-4">
												<div className="text-gray-600">@{user.username}</div>
											</td>
											<td className="py-4 px-4">
												<div className="text-gray-600">{user.email}</div>
											</td>
											<td className="py-4 px-4">
												<div className="text-gray-600">{user.company.name}</div>
											</td>
											<td className="py-4 px-4">
												<motion.button
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
													onClick={(e) => {
														e.stopPropagation();
														setSelectedUser(user);
													}}
													className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
												>
													View Details
												</motion.button>
											</td>
										</motion.tr>
									))}
								</tbody>
							</table>
						</div>
					</Card>
				</motion.div>

				<AnimatePresence>
					{selectedUser && (
						<UserModal
							user={selectedUser}
							onClose={() => setSelectedUser(null)}
						/>
					)}
				</AnimatePresence>
			</div>
		</PageTransition>
	);
}
