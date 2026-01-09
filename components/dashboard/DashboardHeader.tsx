"use client";

import React from "react";
import { DashboardStats, Currency, ExchangeRate } from "@/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui";

interface DashboardHeaderProps {
  stats: DashboardStats;
  displayCurrency: Currency;
  exchangeRate: ExchangeRate | null;
  isRefreshing: boolean;
  onRefreshRate: () => void;
}

export function DashboardHeader({
  stats,
  displayCurrency,
  exchangeRate,
  isRefreshing,
  onRefreshRate,
}: DashboardHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Header Text */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Your financial growth at a glance
          </p>
        </div>
      </div>

      {/* Main Stats Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500 p-8 text-white shadow-2xl transition-all hover:shadow-blue-500/20">

        {/* Abstract Shapes for Coolness */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-900/20 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between mb-8">
          <div>
            <h3 className="text-lg font-medium text-blue-100 mb-1">Total Savings</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-black tracking-tight">
                {formatCurrency(stats.totalSaved, displayCurrency)}
              </span>
              <span className="text-sm font-medium text-blue-200 bg-white/10 px-2 py-1 rounded-full">
                across {stats.totalGoals} goals
              </span>
            </div>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={onRefreshRate}
            isLoading={isRefreshing}
            className="mt-4 md:mt-0 backdrop-blur-md bg-white/20 hover:bg-white/30 border-none text-white rounded-full group"
          >
            <svg
              className={`w-4 h-4 mr-2 transition-transform ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 duration-500'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh Rates
          </Button>
        </div>

        <div className="relative z-10 grid gap-6 md:grid-cols-3">

          {/* Target Stat */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <p className="text-blue-100 text-sm font-medium mb-1">Total Goal Target</p>
            <p className="text-2xl font-bold">
              {formatCurrency(stats.totalTarget, displayCurrency)}
            </p>
            <p className="text-blue-200/60 text-xs mt-1">
              {displayCurrency === "INR" ? "Indian Rupees" : "US Dollars"}
            </p>
          </div>

          {/* Progress Stat */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex justify-between items-end mb-2">
              <p className="text-blue-100 text-sm font-medium">Overall Progress</p>
              <span className="text-2xl font-bold">{stats.overallProgress}%</span>
            </div>
            <div className="bg-black/20 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-300 to-emerald-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                style={{ width: `${stats.overallProgress}%` }}
              />
            </div>
          </div>

          {/* Extra Savings or Rate */}
          {stats.extraSavings > 0 ? (
            <div className="bg-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 border border-emerald-400/30">
              <p className="text-emerald-100 text-sm font-medium mb-1">Surplus Savings</p>
              <p className="text-2xl font-bold text-emerald-300">
                +{formatCurrency(stats.extraSavings, displayCurrency)}
              </p>
              <p className="text-emerald-200/80 text-xs mt-1">Great job!</p>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 flex flex-col justify-center">
              {exchangeRate ? (
                <>
                  <p className="text-blue-100 text-sm font-medium mb-1">Live Exchange Rate</p>
                  <p className="text-2xl font-bold tracking-tight">
                    $1 = ₹{exchangeRate.rate.toFixed(2)}
                  </p>
                  <p className="text-blue-200/60 text-[10px] mt-1 truncate">
                    Updated {formatDateTime(exchangeRate.lastUpdated)}
                  </p>
                </>
              ) : (
                <div className="animate-pulse bg-white/20 h-8 w-24 rounded" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
