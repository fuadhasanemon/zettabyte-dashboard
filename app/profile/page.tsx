"use client";

import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
	UserIcon,
	MailIcon,
	CalendarIcon,
	LogOutIcon,
} from "@/components/icons";

export default function ProfilePage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/auth/signin");
		}
	}, [status, router]);

	if (status === "loading") {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<motion.div
					animate={{ rotate: 360 }}
					transition={{
						duration: 1,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
					className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
				/>
			</div>
		);
	}

	if (!session) {
		return null;
	}

	const handleSignOut = () => {
		signOut({ callbackUrl: "/auth/signin" });
	};

	return (
		<div className="space-y-8">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="text-center"
			>
				<h1 className="text-4xl font-bold text-gray-900 mb-2">Profile</h1>
				<p className="text-xl text-gray-600 mb-3">
					Manage your account information
				</p>
			</motion.div>

			{/* Profile Card */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
			>
				{/* Profile Header */}
				<div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-4 text-white text-center">
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="relative inline-block"
					>
						{session.user?.image ? (
							<img
								src={session.user.image || "/placeholder.svg"}
								alt="Profile"
								className="w-24 h-24 rounded-full border-4 border-white shadow-lg my-3"
							/>
						) : (
							<div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-300 flex items-center justify-center">
								<UserIcon className="w-12 h-12 text-gray-600" />
							</div>
						)}
					</motion.div>
					<motion.h2
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.6 }}
						className="text-2xl font-bold mt-4 pb-5"
					>
						{session.user?.name || "User"}
					</motion.h2>
				</div>

				{/* Profile Details */}
				<div className="p-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.8 }}
						className="space-y-6"
					>
						{/* Email */}
						<div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-2">
							<div className="p-2 bg-blue-100 rounded-lg mr-2">
								<MailIcon className="w-5 h-5 text-blue-600" />
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">
									Email Address
								</p>
								<p className="text-lg text-gray-900">{session.user?.email}</p>
							</div>
						</div>

						{/* Account Type */}
						<div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-2 ">
							<div className="p-2 bg-green-100 rounded-lg mr-2">
								<UserIcon className="w-5 h-5 text-green-600 " />
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">
									Account Type
								</p>
								<p className="text-lg text-gray-900">Google Account</p>
							</div>
						</div>

						{/* Last Sign In */}
						<div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-2">
							<div className="p-2 bg-purple-100 rounded-lg mr-2">
								<CalendarIcon className="w-5 h-5 text-purple-600" />
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">
									Last Sign In
								</p>
								<p className="text-lg text-gray-900">
									{new Date().toLocaleDateString()}
								</p>
							</div>
						</div>
					</motion.div>

					{/* Actions */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 1 }}
						className="mt-8 pt-6 border-t border-gray-200"
					>
						<button
							onClick={handleSignOut}
							className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-red-700 transition-colors"
						>
							<LogOutIcon className="w-5 h-5" />
							<span>Sign Out</span>
						</button>
					</motion.div>
				</div>
			</motion.div>

			{/* Activity Stats */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 1.2 }}
				className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5"
			>
				<div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
					<div className="text-3xl font-bold text-blue-600 mb-2">5</div>
					<div className="text-gray-600">Posts Viewed</div>
				</div>
				<div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
					<div className="text-3xl font-bold text-green-600 mb-2">2</div>
					<div className="text-gray-600">Users Checked</div>
				</div>
				<div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
					<div className="text-3xl font-bold text-purple-600 mb-2">1</div>
					<div className="text-gray-600">Sessions Today</div>
				</div>
			</motion.div>
		</div>
	);
}
