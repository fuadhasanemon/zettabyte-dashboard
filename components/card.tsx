"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CardProps {
	title?: string;
	children: ReactNode;
	className?: string;
}

export function Card({ title, children, className = "" }: CardProps) {
	return (
		<motion.div
			whileHover={{
				scale: 1.02,
				boxShadow:
					"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
			}}
			transition={{ duration: 0.2 }}
			className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${className}`}
		>
			{title && (
				<div className="px-6 py-4 border-b border-gray-200">
					<h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
				</div>
			)}
			<div className="p-6">{children}</div>
		</motion.div>
	);
}
