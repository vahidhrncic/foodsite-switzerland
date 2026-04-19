import { describe, it, expect } from "vitest";
import { regions } from "./regions-data";
import type { Region } from "./types";

describe("regions data integrity", () => {
  it("exports a non-empty array", () => {
    expect(regions.length).toBeGreaterThan(0);
  });

  it("every region has a non-empty name", () => {
    regions.forEach((r: Region) => {
      expect(typeof r.name).toBe("string");
      expect(r.name.length).toBeGreaterThan(0);
    });
  });

  it("every region has valid coordinates (x=lon, y=lat)", () => {
    regions.forEach((r: Region) => {
      expect(r.coordinates.y).toBeGreaterThanOrEqual(-90);
      expect(r.coordinates.y).toBeLessThanOrEqual(90);
      expect(r.coordinates.x).toBeGreaterThanOrEqual(-180);
      expect(r.coordinates.x).toBeLessThanOrEqual(180);
    });
  });

  it("every region has a valid status", () => {
    const valid = ["good", "warning", "critical"];
    regions.forEach((r: Region) => {
      expect(valid).toContain(r.status);
    });
  });

  it("every region has at least one resource", () => {
    regions.forEach((r: Region) => {
      expect(Array.isArray(r.resources)).toBe(true);
      expect(r.resources.length).toBeGreaterThan(0);
    });
  });

  it("no duplicate region ids", () => {
    const ids = regions.map((r: Region) => r.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("all resource trends are valid", () => {
    const valid = ["up", "down", "stable"];
    regions.forEach((r: Region) => {
      r.resources.forEach((res) => {
        expect(valid).toContain(res.trend);
      });
    });
  });
});
