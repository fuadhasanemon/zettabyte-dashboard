"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChartBarIcon, TrendingUpIcon, ClockIcon } from "@/components/icons";
import { ErrorDemo } from "@/components/error-demo";

const stats = [
	{
		name: "Total Posts",
		value: "100",
		change: "+12%",
		changeType: "positive",
		icon: ChartBarIcon,
		color: "blue",
	},
	{
		name: "Total Users",
		value: "10",
		change: "+5%",
		changeType: "positive",
		icon: TrendingUpIcon,
		color: "green",
	},
	{
		name: "Active Sessions",
		value: "25",
		change: "+8%",
		changeType: "positive",
		icon: ClockIcon,
		color: "purple",
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

export default function HomePage() {
	return (
		<div className="space-y-8">
			{/* Header with animated welcome message */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="text-center"
			>
				<motion.h1
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="text-4xl font-bold text-gray-900 my-5"
				>
					Welcome to Zettabyte Dashboard
				</motion.h1>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="text-xl text-gray-600 max-w-2xl mx-auto text-center my-4"
				>
					Your modern dashboard for managing posts and users with real-time
					analytics
				</motion.p>
			</motion.div>

			{/* Animated stats grid */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="grid grid-cols-1 md:grid-cols-3 gap-6"
			>
				{stats.map((stat, index) => (
					<motion.div
						key={stat.name}
						variants={itemVariants}
						whileHover={{
							scale: 1.02,
							transition: { duration: 0.2 },
						}}
						className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
					>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600 mb-1">
									{stat.name}
								</p>
								<p className={`text-3xl font-bold text-${stat.color}-600`}>
									{stat.value}
								</p>
								<p className="text-sm text-green-600 mt-1">
									{stat.change} from last month
								</p>
							</div>
							<div className={`p-3 rounded-lg bg-${stat.color}-50`}>
								<stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
							</div>
						</div>
					</motion.div>
				))}
			</motion.div>

			{/* Animated pulse indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, delay: 0.8 }}
				className="flex justify-center"
			>
				<div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full my-3">
					<motion.div
						animate={{
							scale: [1, 1.2, 1],
							opacity: [1, 0.7, 1],
						}}
						transition={{
							duration: 2,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
						className="w-3 h-3 bg-green-500 rounded-full"
					/>
					<span className="text-sm font-medium text-green-700 ml-2">
						System Online
					</span>
				</div>
			</motion.div>

			{/* Quick actions section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 1 }}
				className="bg-white rounded-xl border border-gray-200 p-6"
			>
				<h2 className="text-xl font-semibold text-gray-900 mb-4">
					Quick Actions
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Link href="/posts">
						<motion.div
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="p-4 text-left rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
						>
							<h3 className="font-medium text-gray-900 mb-1">View All Posts</h3>
							<p className="text-sm text-gray-600">
								Browse and manage your posts
							</p>
						</motion.div>
					</Link>
					<Link href="/users">
						<motion.div
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="p-4 text-left rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors cursor-pointer"
						>
							<h3 className="font-medium text-gray-900 mb-1">Manage Users</h3>
							<p className="text-sm text-gray-600">
								View and edit user accounts
							</p>
						</motion.div>
					</Link>
				</div>
			</motion.div>

			<ErrorDemo />
		</div>
	);
}
