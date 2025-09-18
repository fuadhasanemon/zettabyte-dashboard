import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Zettabyte Dashboard",
	description: "A modern dashboard built with Next.js 15",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={inter.className}>
			<body className="bg-gray-50 text-gray-900">
				<Providers>
					<div className="flex h-screen">
						<Sidebar />
						<main className="flex-1 overflow-auto">
							<div className="p-6">{children}</div>
						</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
