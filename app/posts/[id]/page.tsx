"use client";

import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import { useFetch } from "@/hooks/use-fetch";
import { Card } from "@/components/card";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ErrorMessage } from "@/components/error-message";

interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

interface User {
	id: number;
	name: string;
	email: string;
	username: string;
}

interface PostPageProps {
	params: {
		id: string;
	};
}

export default function PostPage({ params }: PostPageProps) {
	const { id } = React.use(params);
	const {
		data: post,
		loading: postLoading,
		error: postError,
	} = useFetch<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);

	const {
		data: user,
		loading: userLoading,
		error: userError,
	} = useFetch<User>(
		post ? `https://jsonplaceholder.typicode.com/users/${post.userId}` : ""
	);

	if (postLoading) {
		return (
			<div className="space-y-6">
				<div className="flex justify-center py-12">
					<LoadingSpinner size="lg" />
				</div>
			</div>
		);
	}

	if (postError) {
		return (
			<div className="space-y-6">
				<Link
					href="/posts"
					className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
				>
					← Back to Posts
				</Link>
				<ErrorMessage message={postError} />
			</div>
		);
	}

	if (!post) {
		return (
			<div className="space-y-6">
				<Link
					href="/posts"
					className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
				>
					← Back to Posts
				</Link>
				<ErrorMessage message="Post not found" />
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Link
					href="/posts"
					className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
				>
					← Back to Posts
				</Link>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.1 }}
			>
				<Card>
					<div className="space-y-6">
						<div>
							<h1 className="text-3xl font-bold text-gray-900 mb-4">
								{post.title}
							</h1>

							{userLoading ? (
								<div className="flex items-center space-x-2">
									<LoadingSpinner size="sm" />
									<span className="text-gray-500">Loading author...</span>
								</div>
							) : userError ? (
								<p className="text-gray-500">Author information unavailable</p>
							) : user ? (
								<div className="flex items-center space-x-2 text-gray-600">
									<span className="mr-2">By</span>
									<span className="font-medium text-gray-900">{user.name}</span>
									<span className="mx-2">•</span>
									<span>{user.email}</span>
								</div>
							) : null}
						</div>

						<div className="prose max-w-none">
							<p className="text-gray-700 leading-relaxed text-lg py-5">
								{post.body}
							</p>
						</div>

						<div className="pt-6 border-t border-gray-200">
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-500">
									Post ID: {post.id}
								</span>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
								>
									Share Post
								</motion.button>
							</div>
						</div>
					</div>
				</Card>
			</motion.div>
		</div>
	);
}
