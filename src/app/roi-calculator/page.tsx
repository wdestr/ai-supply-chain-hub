'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import Card from '@/components/Card';

interface Inputs {
  annualRevenue: number;
  forecastErrorReduction: number;
  inventoryReduction: number;
  transportationEfficiency: number;
  laborProductivity: number;
  aiInvestment: number;
}

const defaults: Inputs = {
  annualRevenue: 500000000,
  forecastErrorReduction: 30,
  inventoryReduction: 20,
  transportationEfficiency: 12,
  laborProductivity: 25,
  aiInvestment: 500000,
};

function formatCurrency(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

export default function ROICalculatorPage() {
  const [inputs, setInputs] = useState<Inputs>(defaults);

  const update = (key: keyof Inputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  // Calculations (based on industry benchmarks from research)
  const cogsEstimate = inputs.annualRevenue * 0.65;
  const inventoryCost = cogsEstimate * 0.15; // inventory carrying as % of COGS
  const transportCost = inputs.annualRevenue * 0.06; // transport as % of revenue
  const warehouseLaborCost = inputs.annualRevenue * 0.03; // warehouse labor
  const stockoutCost = inputs.annualRevenue * 0.04; // lost sales from stockouts

  const forecastSavings = stockoutCost * (inputs.forecastErrorReduction / 100) * 0.65;
  const inventorySavings = inventoryCost * (inputs.inventoryReduction / 100);
  const transportSavings = transportCost * (inputs.transportationEfficiency / 100);
  const laborSavings = warehouseLaborCost * (inputs.laborProductivity / 100);

  const totalSavings = forecastSavings + inventorySavings + transportSavings + laborSavings;
  const roi = ((totalSavings - inputs.aiInvestment) / inputs.aiInvestment) * 100;
  const paybackMonths = (inputs.aiInvestment / (totalSavings / 12));

  return (
    <>
      <Hero
        title="ROI Calculator"
        subtitle="Estimate the return on investment for AI in your supply chain. Adjust the sliders to match your organization."
        gradient="from-emerald-500 to-amber-500"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Inputs */}
          <div className="lg:col-span-3">
            <Card hover={false}>
              <h2 className="text-xl font-bold text-white">Your Inputs</h2>
              <p className="mt-1 text-sm text-slate-500">Adjust these to match your organization</p>

              <div className="mt-8 space-y-8">
                {/* Annual Revenue */}
                <div>
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-300">Annual Revenue</label>
                    <span className="text-sm font-bold text-white">{formatCurrency(inputs.annualRevenue)}</span>
                  </div>
                  <input
                    type="range"
                    min={10000000}
                    max={10000000000}
                    step={10000000}
                    value={inputs.annualRevenue}
                    onChange={(e) => update('annualRevenue', Number(e.target.value))}
                    className="mt-2 w-full accent-electric-500"
                  />
                  <div className="flex justify-between text-xs text-slate-600"><span>$10M</span><span>$10B</span></div>
                </div>

                {/* Forecast Error Reduction */}
                <div>
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-300">Forecast Error Reduction</label>
                    <span className="text-sm font-bold text-electric-400">{inputs.forecastErrorReduction}%</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    step={1}
                    value={inputs.forecastErrorReduction}
                    onChange={(e) => update('forecastErrorReduction', Number(e.target.value))}
                    className="mt-2 w-full accent-electric-500"
                  />
                  <div className="flex justify-between text-xs text-slate-600"><span>5% (conservative)</span><span>50% (McKinsey benchmark)</span></div>
                </div>

                {/* Inventory Reduction */}
                <div>
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-300">Inventory Reduction</label>
                    <span className="text-sm font-bold text-emerald-400">{inputs.inventoryReduction}%</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={inputs.inventoryReduction}
                    onChange={(e) => update('inventoryReduction', Number(e.target.value))}
                    className="mt-2 w-full accent-emerald-500"
                  />
                  <div className="flex justify-between text-xs text-slate-600"><span>5%</span><span>30% (MEIO benchmark)</span></div>
                </div>

                {/* Transportation Efficiency */}
                <div>
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-300">Transportation Efficiency Gain</label>
                    <span className="text-sm font-bold text-amber-400">{inputs.transportationEfficiency}%</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={20}
                    step={1}
                    value={inputs.transportationEfficiency}
                    onChange={(e) => update('transportationEfficiency', Number(e.target.value))}
                    className="mt-2 w-full accent-amber-500"
                  />
                  <div className="flex justify-between text-xs text-slate-600"><span>3%</span><span>20% (UPS ORION-level)</span></div>
                </div>

                {/* Warehouse Labor */}
                <div>
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-300">Warehouse Labor Productivity</label>
                    <span className="text-sm font-bold text-violet-400">{inputs.laborProductivity}%</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={40}
                    step={1}
                    value={inputs.laborProductivity}
                    onChange={(e) => update('laborProductivity', Number(e.target.value))}
                    className="mt-2 w-full accent-violet-500"
                  />
                  <div className="flex justify-between text-xs text-slate-600"><span>5%</span><span>40% (AMR benchmark)</span></div>
                </div>

                {/* AI Investment */}
                <div>
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-slate-300">Total AI Investment (Year 1)</label>
                    <span className="text-sm font-bold text-white">{formatCurrency(inputs.aiInvestment)}</span>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={5000000}
                    step={10000}
                    value={inputs.aiInvestment}
                    onChange={(e) => update('aiInvestment', Number(e.target.value))}
                    className="mt-2 w-full accent-rose-500"
                  />
                  <div className="flex justify-between text-xs text-slate-600"><span>$10K</span><span>$5M</span></div>
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-6 lg:col-span-2">
            {/* ROI Summary */}
            <div className={`rounded-2xl bg-gradient-to-br ${roi > 0 ? 'from-emerald-500/20 to-electric-500/20' : 'from-rose-500/20 to-amber-500/20'} p-[1px]`}>
              <div className="rounded-2xl bg-navy-950 p-6">
                <div className="text-sm font-medium text-slate-400">Estimated Annual ROI</div>
                <div className={`text-4xl font-extrabold ${roi > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {roi > 0 ? '+' : ''}{roi.toFixed(0)}%
                </div>
                <div className="mt-2 text-sm text-slate-400">
                  Payback in <span className="font-bold text-white">{paybackMonths < 1 ? '<1' : paybackMonths.toFixed(1)}</span> months
                </div>
              </div>
            </div>

            {/* Savings Breakdown */}
            <Card hover={false}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Annual Savings Breakdown</h3>
              <div className="mt-4 space-y-4">
                {[
                  { label: 'Demand Forecasting', value: forecastSavings, color: 'bg-electric-500' },
                  { label: 'Inventory Optimization', value: inventorySavings, color: 'bg-emerald-500' },
                  { label: 'Transportation', value: transportSavings, color: 'bg-amber-500' },
                  { label: 'Warehouse Labor', value: laborSavings, color: 'bg-violet-500' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="font-medium text-white">{formatCurrency(item.value)}</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-500`}
                        style={{ width: `${totalSavings > 0 ? (item.value / totalSavings) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}

                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-300">Total Annual Savings</span>
                    <span className="text-lg font-bold text-emerald-400">{formatCurrency(totalSavings)}</span>
                  </div>
                  <div className="mt-1 flex justify-between text-sm">
                    <span className="text-slate-500">Less: AI Investment</span>
                    <span className="text-rose-400">-{formatCurrency(inputs.aiInvestment)}</span>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-white/10 pt-2 text-sm">
                    <span className="font-bold text-white">Net Annual Value</span>
                    <span className={`text-lg font-bold ${totalSavings - inputs.aiInvestment > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {formatCurrency(totalSavings - inputs.aiInvestment)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Methodology */}
            <Card hover={false}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Methodology</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Estimates based on industry benchmarks from McKinsey, Gartner, and real company results. COGS estimated at 65% of revenue. Inventory carrying cost at 15% of COGS. Transportation at 6% of revenue. Warehouse labor at 3% of revenue. Stockout cost at 4% of revenue. Actual results will vary.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
