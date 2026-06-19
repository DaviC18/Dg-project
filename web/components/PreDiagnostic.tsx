/** biome-ignore-all assist/source/organizeImports: <> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <> */
"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { useWindow } from "@/hooks/WindowContext";

const PreDiagnostic = () => {
	const { activeWindow, closeWindow } = useWindow();

	// Só abre quando a janela ativa for "prediagnostic".
	useEffect(() => {
		document.body.style.overflow =
			activeWindow === "prediagnostic" ? "hidden" : "auto";

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [activeWindow]);

	if (activeWindow !== "prediagnostic") return null;

	return (
		<section className="fixed inset-0 z-30 flex items-center justify-center overflow-auto bg-black/60 select-none max-lg:items-start">
			<div
				onClick={closeWindow}
				className="absolute z-40 h-full w-full"
			/>

			<div className="absolute z-50 w-3/4 rounded-2xl bg-[#f4f4f4] px-7 pb-7.5 pt-4 flex flex-col gap-5 justify-between max-lg:my-5">
				<div className="flex w-full items-center justify-end">
					<button
						onClick={closeWindow}
						type="button"
						className="cursor-pointer"
					>
						<X size={30} className="text-gray-700" />
					</button>
				</div>

				{/* Aqui você renderiza os dados do pré-diagnóstico selecionado depois */}
				<div className="rounded-xl border border-dashed border-slate-300 p-4 text-slate-600">
					Pre-diagnostic modal opened.
				</div>
			</div>
		</section>
	);
};

export default PreDiagnostic;