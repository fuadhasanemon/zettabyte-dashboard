"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useFetch } from "@/hooks/use-fetch";
import { Card } from "@/components/card";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorMessage } from "@/components/error-message";
import { PageTransition } from "@/components/page-transition";

interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

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

export default function PostsPage() {
	const {
		data: posts,
		loading,
		error,
		refetch,
	} = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts");

	if (loading) {
		return (
			<PageTransition>
				<div className="space-y-6">
					<h1 className="text-3xl font-bold text-gray-900">Posts</h1>
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
					<h1 className="text-3xl font-bold text-gray-900">Posts</h1>
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
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Posts</h1>
					<p className="text-gray-600 mb-4">
						Browse all posts from our community
					</p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{posts?.map((post) => (
						<motion.div key={post.id} variants={itemVariants}>
							<Link href={`/posts/${post.id}`}>
								<Card className="h-full cursor-pointer hover:border-blue-300 transition-colors">
									<div className="space-y-3">
										<h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
											{post.title}
										</h3>
										<p className="text-gray-600 text-sm line-clamp-3 mb-2">
											{post.body}
										</p>
										<div className="flex items-center justify-between pt-2">
											<span className="text-xs text-gray-500">
												Post #{post.id}
											</span>
											<span className="text-xs text-blue-600 font-medium">
												Read more →
											</span>
										</div>
									</div>
								</Card>
							</Link>
						</motion.div>
					))}
				</motion.div>
			</div>
		</PageTransition>
	);
}
