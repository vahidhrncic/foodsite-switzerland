import { describe, it, expect, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "./use-mobile";

type MqlListener = () => void;

function setupMatchMedia(innerWidth: number) {
  const listeners: MqlListener[] = [];

  const mql = {
    matches: innerWidth < 768,
    addEventListener: (_: string, fn: MqlListener) => listeners.push(fn),
    removeEventListener: (_: string, fn: MqlListener) => {
      const i = listeners.indexOf(fn);
      if (i !== -1) listeners.splice(i, 1);
    },
  };

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn().mockReturnValue(mql),
  });

  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: innerWidth,
  });

  const trigger = (newWidth: number) => {
    Object.defineProperty(window, "innerWidth", { value: newWidth, configurable: true });
    listeners.forEach((fn) => fn());
  };

  return { trigger };
}

describe("useIsMobile()", () => {
  afterEach(() => vi.restoreAllMocks());

  it("returns false when viewport is >= 768px", () => {
    setupMatchMedia(1024);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true when viewport is < 768px", () => {
    setupMatchMedia(375);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("updates when media query fires with smaller width", () => {
    const { trigger } = setupMatchMedia(1024);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => trigger(375));
    expect(result.current).toBe(true);
  });
});
