"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { useSidebar } from "@/contexts/sidebar-context";
import {
	HomeIcon,
	DocumentTextIcon,
	UsersIcon,
	Bars3Icon,
	XMarkIcon,
	UserIcon,
	LogInIcon,
	LogOutIcon,
} from "@/components/icons";

const navigation = [
	{ name: "Home", href: "/", icon: HomeIcon },
	{ name: "Posts", href: "/posts", icon: DocumentTextIcon },
	{ name: "Users", href: "/users", icon: UsersIcon },
];

export function Sidebar() {
	const { isCollapsed, toggleSidebar } = useSidebar();
	const pathname = usePathname();
	const { data: session, status } = useSession();

	return (
		<motion.div
			initial={false}
			animate={{ width: isCollapsed ? 80 : 256 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className="bg-white border-r border-gray-200 flex flex-col"
		>
			{/* Header */}
			<div className="p-4 border-b border-gray-200">
				<div className="flex items-center justify-between">
					<motion.h1
						initial={false}
						animate={{ opacity: isCollapsed ? 0 : 1 }}
						transition={{ duration: 0.2 }}
						className="text-xl font-bold text-gray-900"
					>
						{!isCollapsed && "Zettabyte"}
					</motion.h1>
					<button
						onClick={toggleSidebar}
						className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
					>
						{isCollapsed ? (
							<Bars3Icon className="w-5 h-5" />
						) : (
							<XMarkIcon className="w-5 h-5" />
						)}
					</button>
				</div>
			</div>

			{/* Navigation */}
			<nav className="flex-1 p-4">
				<ul className="space-y-2">
					{navigation.map((item) => {
						const isActive = pathname === item.href;
						return (
							<li key={item.name}>
								<Link
									href={item.href}
									className={`flex items-center px-3 py-2 rounded-lg mb-2 transition-colors ${
										isActive
											? "bg-blue-50 text-blue-700"
											: "text-gray-700 hover:bg-gray-100"
									}`}
								>
									<item.icon className="w-5 h-5 flex-shrink-0 mr-2" />
									<motion.span
										initial={false}
										animate={{
											opacity: isCollapsed ? 0 : 1,
											x: isCollapsed ? -10 : 0,
										}}
										transition={{ duration: 0.2 }}
										className="ml-3"
									>
										{!isCollapsed && item.name}
									</motion.span>
								</Link>
							</li>
						);
					})}

					{session && (
						<li>
							<Link
								href="/profile"
								className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
									pathname === "/profile"
										? "bg-blue-50 text-blue-700"
										: "text-gray-700 hover:bg-gray-100"
								}`}
							>
								<UserIcon className="w-5 h-5 flex-shrink-0 mr-2" />
								<motion.span
									initial={false}
									animate={{
										opacity: isCollapsed ? 0 : 1,
										x: isCollapsed ? -10 : 0,
									}}
									transition={{ duration: 0.2 }}
									className="ml-3"
								>
									{!isCollapsed && "Profile"}
								</motion.span>
							</Link>
						</li>
					)}
				</ul>
			</nav>

			<div className="p-4 border-t border-gray-200">
				{status === "loading" ? (
					<div className="flex items-center justify-center py-2">
						<motion.div
							animate={{ rotate: 360 }}
							transition={{
								duration: 1,
								repeat: Number.POSITIVE_INFINITY,
								ease: "linear",
							}}
							className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full"
						/>
					</div>
				) : session ? (
					<div className="space-y-3">
						{/* User info */}
						{!isCollapsed && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg"
							>
								{session.user?.image ? (
									<img
										src={session.user.image || "/placeholder.svg"}
										alt="Profile"
										className="w-8 h-8 rounded-full"
									/>
								) : (
									<div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
										<UserIcon className="w-4 h-4 text-gray-600" />
									</div>
								)}
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium text-gray-900 truncate">
										{session.user?.name}
									</p>
									<p className="text-xs text-gray-500 truncate">
										{session.user?.email}
									</p>
								</div>
							</motion.div>
						)}

						{/* Sign out button */}
						<button
							onClick={() => signOut()}
							className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
						>
							<LogOutIcon className="w-5 h-5 flex-shrink-0" />
							<motion.span
								initial={false}
								animate={{
									opacity: isCollapsed ? 0 : 1,
									x: isCollapsed ? -10 : 0,
								}}
								transition={{ duration: 0.2 }}
								className="ml-3"
							>
								{!isCollapsed && "Sign Out"}
							</motion.span>
						</button>
					</div>
				) : (
					<button
						onClick={() => signIn()}
						className="w-full flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
					>
						<LogInIcon className="w-5 h-5 flex-shrink-0" />
						<motion.span
							initial={false}
							animate={{
								opacity: isCollapsed ? 0 : 1,
								x: isCollapsed ? -10 : 0,
							}}
							transition={{ duration: 0.2 }}
							className="ml-3"
						>
							{!isCollapsed && "Sign In"}
						</motion.span>
					</button>
				)}
			</div>
		</motion.div>
	);
}
