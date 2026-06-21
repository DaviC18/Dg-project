/** biome-ignore-all assist/source/organizeImports: <> */
"use client";

import {
	createContext,
	useContext,
	useState,
	type ReactNode,
} from "react";

export type ActiveWindow = "form" | null;

type WindowContextType = {
	activeWindow: ActiveWindow;
	openWindow: (window: ActiveWindow) => void;
	closeWindow: () => void;
};

const WindowContext = createContext<WindowContextType | null>(null);

export function WindowProvider({ children }: { children: ReactNode }) {
	// Guarda qual janela está aberta no momento.
	const [activeWindow, setActiveWindow] = useState<ActiveWindow>(null);

	// Abre uma janela específica: form ou prediagnostic.
	const openWindow = (window: ActiveWindow) => setActiveWindow(window);

	// Fecha qualquer janela aberta.
	const closeWindow = () => setActiveWindow(null);

	return (
		<WindowContext.Provider
			value={{
				activeWindow,
				openWindow,
				closeWindow,
			}}
		>
			{children}
		</WindowContext.Provider>
	);
}

export function useWindow() {
	const context = useContext(WindowContext);

	if (!context) {
		throw new Error("useWindow deve ser usado dentro de WindowProvider");
	}

	return context;
}