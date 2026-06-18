/** biome-ignore-all lint/suspicious/noExplicitAny: <> */

import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Tokenkey } from "@/app/hooks/TokenKey";

// ======================
// Mocks
// ======================

const handleSubmitMock = vi.fn();
const closeFormMock = vi.fn();

vi.mock("@/app/hooks/useSubmitFormToken", () => ({
	useSubmitFormToken: () => ({
		handleSubmit: handleSubmitMock,
	}),
}));

vi.mock("@/app/hooks/FormContext", () => ({
	useFormDiagnostic: () => ({
		isOpen: true,
		closeForm: closeFormMock,
	}),
}));

// Não queremos testar TokenKey aqui.
// Apenas simulamos um botão normal.

vi.mock("../app/hooks/TokenKey", () => ({
	Tokenkey: ({ children, ...props }: any) => (
		<button {...props}>{children}</button>
	),
}));

// Mock do ícone do Lucide
vi.mock("lucide-react", () => ({
	X: () => <span>Close</span>,
}));

// Import DEPOIS dos mocks
import FormDiagnostic from "@/components/FormDiagnostic";

describe("FormDiagnostic", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should render form when modal is open", () => {
		render(<FormDiagnostic />);

		expect(
			screen.getByText("Describe what you are feeling:")
		).toBeInTheDocument();

		expect(
			screen.getByRole("button", {
				name: /submit/i,
			})
		).toBeInTheDocument();
	});

	it("should close modal when clicking close button", () => {
		render(<FormDiagnostic />);

		const buttons = screen.getAllByRole("button");

		fireEvent.click(buttons[0]);

		expect(closeFormMock).toHaveBeenCalledTimes(1);
	});

	it("should submit form", () => {
		render(<FormDiagnostic />);

		const form = document.querySelector("form");

		expect(form).toBeInTheDocument();

		fireEvent.submit(form!);

		expect(handleSubmitMock).toHaveBeenCalledTimes(1);
	});

	it("should lock body scroll while modal is open", () => {
		render(<FormDiagnostic />);

		expect(document.body.style.overflow).toBe("hidden");
	});
});