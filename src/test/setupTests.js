import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn();
  root = null;
  rootMargin = "";
  thresholds = [];
}

globalThis.IntersectionObserver = IntersectionObserverMock;
window.IntersectionObserver = IntersectionObserverMock;
