import { cleanup } from "@testing-library/react";
import { afterEach,  vi } from "vitest";

// Limpa a árvore React após cada teste

afterEach(() => {
    cleanup(),
        vi.clearAllMocks()
})

// Mock do scrollintoView
window.HTMLElement.prototype.scrollIntoView = vi.fn()

// Mock do matchMedia
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removerListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
    }))
})  

// Mock do ResizeObeserver 
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock do IntersectionObserver
globalThis.IntersectionObserver = class implements IntersectionObserver {
  root: Element | Document | null = null;

  rootMargin = "";

  scrollMargin = "";

  thresholds: ReadonlyArray<number> = [];

  disconnect(): void {}

  observe(): void {}

  unobserve(): void {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};