import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MetricsCard } from "./MetricsCard";
import { Package } from "lucide-react";

describe("MetricsCard", () => {
  it("renders title and value", () => {
    render(<MetricsCard title="Importe" value="12.8 Mrd. CHF" icon={<Package />} />);
    expect(screen.getByText("Importe")).toBeInTheDocument();
    expect(screen.getByText("12.8 Mrd. CHF")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<MetricsCard title="X" value="Y" icon={<Package />} description="Stand 2022" />);
    expect(screen.getByText("Stand 2022")).toBeInTheDocument();
  });

  it("does not render description element when omitted", () => {
    render(<MetricsCard title="X" value="Y" icon={<Package />} />);
    expect(screen.queryByText("Stand 2022")).not.toBeInTheDocument();
  });

  it("renders numeric value", () => {
    render(<MetricsCard title="Rate" value={54} icon={<Package />} />);
    expect(screen.getByText("54")).toBeInTheDocument();
  });
});
