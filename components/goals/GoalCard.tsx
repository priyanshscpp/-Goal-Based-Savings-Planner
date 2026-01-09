"use client";

import React from "react";
import { Goal, ExchangeRate, Currency } from "@/types";
import { formatCurrency, calculatePercentage, convertCurrency, getOppositeCurrency } from "@/lib/utils";
import { Card, Button, ProgressBar } from "@/components/ui";

interface GoalCardProps {
  goal: Goal;
  exchangeRate: ExchangeRate | null;
  onAddContribution: (goalId: string) => void;
  onViewContributions: (goalId: string) => void;
  onEdit?: (goalId: string) => void;
  onDelete?: (goalId: string) => void;
}

export function GoalCard({
  goal,
  exchangeRate,
  onAddContribution,
  onViewContributions,
  onEdit,
  onDelete,
}: GoalCardProps) {
  const progress = calculatePercentage(goal.currentAmount, goal.targetAmount);
  const oppositeCurrency = getOppositeCurrency(goal.currency);

  const convertedTarget = exchangeRate
    ? convertCurrency(
      goal.targetAmount,
      goal.currency,
      oppositeCurrency,
      exchangeRate
    )
    : 0;

  const convertedCurrent = exchangeRate
    ? convertCurrency(
      goal.currentAmount,
      goal.currency,
      oppositeCurrency,
      exchangeRate
    )
    : 0;

  return (
    <Card className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-3xl border border-gray-100 overflow-hidden group">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              {/* Goal Icon Placeholder - could be dynamic based on name */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">
                {goal.name}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">
                Started {new Date(goal.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={() => onEdit(goal.id)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(goal.id)}
              className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Target</p>
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(goal.targetAmount, goal.currency)}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 font-medium">
              ≈ {formatCurrency(convertedTarget, oppositeCurrency)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Saved</p>
            <p className="text-xl font-bold text-emerald-600">
              {formatCurrency(goal.currentAmount, goal.currency)}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 font-medium">
              ≈ {formatCurrency(convertedCurrent, oppositeCurrency)}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500">Progress</span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              {progress}%
            </span>
          </div>
          <ProgressBar percentage={progress} height="md" color="gradient" />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-4">
          <button
            onClick={() => onViewContributions(goal.id)}
            className="text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 py-2"
          >
            Show History
            <span className="bg-gray-100 text-gray-600 py-0.5 px-1.5 rounded-md text-[10px] group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
              {goal.contributions.length}
            </span>
          </button>

          <Button
            size="sm"
            variant="primary"
            onClick={() => onAddContribution(goal.id)}
            className="rounded-full px-5 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
          >
            <svg
              className="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Savings
          </Button>
        </div>
      </div>
    </Card>
  );
}
