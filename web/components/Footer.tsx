/** biome-ignore-all assist/source/organizeImports: <> */
"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ShieldAlert } from "lucide-react";

export default function Footer() {
	const year = useMemo(() => new Date().getFullYear(), []);

	return (
		<footer className="border-t border-slate-200 bg-slate-950">
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:flex-row lg:items-center lg:justify-between">
				<div className="max-w-md space-y-3">
					<div className="flex items-center gap-2">
						<ShieldAlert className="h-5 w-5 text-cyan-600" />
						<h2 className="text-lg font-semibold text-white">
							Doctor Genesis
						</h2>
					</div>

					<p className="text-sm leading-6 text-slate-50">
						AI-assisted clinical pre-diagnosis platform designed to help with
						triage support, structured intake, and case organization.
					</p>

					<p className="text-xs leading-5 text-slate-50">
						This product does not replace medical evaluation, diagnosis, or
						emergency care.
					</p>
				</div>

				<div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
					<div className="space-y-3">
						<h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-50">
							Product
						</h3>
						<ul className="space-y-2 text-sm text-slate-50">
							<li>
								<Link href="/" className="transition hover:text-cyan-600">
									Home
								</Link>
							</li>
							<li>
								<Link href="/about" className="transition hover:text-cyan-600">
									About
								</Link>
							</li>
							<li>
								<Link href="/ia" className="transition hover:text-cyan-600">
									AI
								</Link>
							</li>
							<li>
								<Link href="/list" className="transition hover:text-cyan-600">
									List
								</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-3">
						<h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-50">
							Project
						</h3>
						<ul className="space-y-2 text-sm text-slate-50">
							<li>
								<a
									href="https://github.com/DaviC18/Dg-project"
									target="_blank"
									rel="noreferrer"
									className="transition hover:text-cyan-600"
								>
									GitHub
								</a>
							</li>
							<li>
								<span className="text-slate-50">v1.0</span>
							</li>
							<li>
								<span className="text-slate-50">{year}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}