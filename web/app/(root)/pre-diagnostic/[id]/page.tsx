/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */
/** biome-ignore-all lint/style/noNonNullAssertion: <> */
/** biome-ignore-all assist/source/organizeImports: <> */
"use client";

import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import {
	AlertTriangle,
	ClipboardList,
	Stethoscope,
} from "lucide-react";

import type { PreDiagnostics } from "@/types/preDiagnotics";
import { usePreDiagnosticId } from "@/hooks/PrediagnosticId";


function urgencyLabel(
	level: PreDiagnostics["result"]["urgencyLevel"],
) {
	switch (level) {
		case "low":
			return "Low";
		case "medium":
			return "Medium";
		case "urgent":
			return "Urgent";
		case "life_threatening":
			return "Emergency";
		default:
			return level;
	}
}

function urgencyStyle(
	level: PreDiagnostics["result"]["urgencyLevel"],
) {
	switch (level) {
		case "low":
			return "border-emerald-200 bg-emerald-50 text-emerald-700";
		case "medium":
			return "border-amber-200 bg-amber-50 text-amber-700";
		case "urgent":
			return "border-orange-200 bg-orange-50 text-orange-700";
		case "life_threatening":
			return "border-red-200 bg-red-50 text-red-700";
		default:
			return "border-slate-200 bg-slate-50 text-slate-700";
	}
}

export default function Page() {
	const { id } = useParams<{ id: string }>();
	const { user } = useUser();

  const {data, loading, error} = usePreDiagnosticId(id)

	const clerkName = useMemo(() => {
		return (
			user?.fullName ||
			user?.firstName ||
			user?.username ||
			user?.primaryEmailAddress?.emailAddress ||
			"User"
		);
	}, [user]);

	if (loading) {
		return (
			<main className="min-h-screen bg-white px-6 py-16 text-slate-950">
				<div className="mx-auto max-w-5xl">
					<p className="text-sm uppercase tracking-[0.35em] text-cyan-600">
						Loading pre-diagnostic
					</p>
				</div>
			</main>
		);
	}

	if (error) {
		return (
			<main className="min-h-screen bg-white px-6 py-16 text-slate-950">
				<div className="mx-auto max-w-5xl">
					<div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
						<strong>Error:</strong> {error}
					</div>
				</div>
			</main>
		);
	}

	if (!data) {
		return (
			<main className="min-h-screen bg-white px-6 py-16 text-slate-950">
				<div className="mx-auto max-w-5xl">
					<p className="text-slate-600">Pre-diagnostic not found.</p>
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-white px-6 py-10 text-slate-950">
			<section className="mx-auto max-w-6xl">
				<div className="mb-8 flex flex-col gap-3">
					<p className="text-sm uppercase tracking-[0.35em] text-cyan-600">
						Pre-diagnostic
					</p>

					<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
						{data.result.title}
					</h1>

					<p className="text-sm text-slate-500">
						Patient:{" "}
						<span className="font-medium text-slate-700">{clerkName}</span>
					</p>
				</div>

				<div className="grid gap-6 lg:grid-cols-3">
					<div className="space-y-6 lg:col-span-2">
						<div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
							<div className="mb-4 flex items-center gap-2">
								<ClipboardList className="h-5 w-5 text-cyan-600" />
								<h2 className="text-lg font-semibold">Clinical summary</h2>
							</div>
							<p className="leading-8 text-slate-700">
								{data.result.summary}
							</p>
						</div>

						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<div className="mb-4 flex items-center gap-2">
								<AlertTriangle className="h-5 w-5 text-orange-500" />
								<h2 className="text-lg font-semibold">Alerts</h2>
							</div>

							{data.result.alerts.length > 0 ? (
								<ul className="list-disc space-y-2 pl-5 text-slate-700">
									{data.result.alerts.map((item, index) => (
										<li key={`${item}-${index}`}>{item}</li>
									))}
								</ul>
							) : (
								<p className="text-slate-500">No alerts identified.</p>
							)}
						</div>

						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<div className="mb-4 flex items-center gap-2">
								<Stethoscope className="h-5 w-5 text-cyan-600" />
								<h2 className="text-lg font-semibold">
									Suggestions for the physician
								</h2>
							</div>

							{data.result.suggestionsToTheDoctor.length > 0 ? (
								<ul className="list-disc space-y-2 pl-5 text-slate-700">
									{data.result.suggestionsToTheDoctor.map((item, index) => (
										<li key={`${item}-${index}`}>{item}</li>
									))}
								</ul>
							) : (
								<p className="text-slate-500">No suggestions at the moment.</p>
							)}
						</div>

						<div className="grid gap-6 md:grid-cols-2">
							<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
								<h2 className="mb-4 text-lg font-semibold">Suggested exams</h2>
								{data.result.examsSuggested.length > 0 ? (
									<ul className="list-disc space-y-2 pl-5 text-slate-700">
										{data.result.examsSuggested.map((item, index) => (
											<li key={`${item}-${index}`}>{item}</li>
										))}
									</ul>
								) : (
									<p className="text-slate-500">No exams suggested.</p>
								)}
							</div>

							<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
								<h2 className="mb-4 text-lg font-semibold">Observations</h2>
								{data.result.observations.length > 0 ? (
									<ul className="list-disc space-y-2 pl-5 text-slate-700">
										{data.result.observations.map((item, index) => (
											<li key={`${item}-${index}`}>{item}</li>
										))}
									</ul>
								) : (
									<p className="text-slate-500">No additional observations.</p>
								)}
							</div>
						</div>
					</div>

					<aside className="space-y-6">
						<div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
							<p className="mb-2 text-sm uppercase tracking-[0.3em] text-slate-500">
								Urgency
							</p>

							<div
								className={`inline-flex rounded-full border px-4 py-2 text-sm font-medium ${urgencyStyle(
									data.result.urgencyLevel,
								)}`}
							>
								{urgencyLabel(data.result.urgencyLevel)}
							</div>

							<div className="mt-4">
								<p className="text-sm text-slate-500">Next step</p>
								<p className="mt-1 leading-7 text-slate-700">
									{data.result.nextStep}
								</p>
							</div>

							{data.result.safetyNotice ? (
								<div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
									{data.result.safetyNotice}
								</div>
							) : null}
						</div>

						<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<h2 className="mb-4 text-lg font-semibold">Form data</h2>

							<div className="space-y-3 text-sm text-slate-700">
								<p>
									<strong>Complaint:</strong> {data.form.symptomsDescription}
								</p>
								<p>
									<strong>Start date:</strong> {data.form.startDate}
								</p>
								<p>
									<strong>Status:</strong> {data.form.symptomsStatus}
								</p>
								<p>
									<strong>Pain:</strong> {data.form.painLevel}/10
								</p>
								<p>
									<strong>Had it before:</strong> {data.form.hadBefore}
								</p>
								<p>
									<strong>Seen by a professional:</strong>{" "}
									{data.form.seenByProfessional}
								</p>
							</div>
						</div>
					</aside>
				</div>
			</section>
		</main>
	);
}