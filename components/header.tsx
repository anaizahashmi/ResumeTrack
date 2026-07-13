'use client';

import { Search, Menu, X, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DEFAULT_CATEGORIES, STATUS_ORDER } from '@/lib/types';
import { cn } from '@/lib/utils';

interface HeaderProps {
  search: string;
  onSearchChange: (v: string) => void;
  categoryFilter: string;
  onCategoryChange: (v: string) => void;
  statusFilter: string;
  onStatusChange: (v: string) => void;
  onMenuClick: () => void;
  title: string;
  subtitle: string;
}

export function Header({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  onMenuClick,
  title,
  subtitle,
}: HeaderProps) {
  const hasFilters = categoryFilter !== 'all' || statusFilter !== 'all' || search !== '';

  const clearFilters = () => {
    onSearchChange('');
    onCategoryChange('all');
    onStatusChange('all');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-xl">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-zinc-400 hover:text-white"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold tracking-tight text-white truncate">
              {title}
            </h2>
            <p className="text-xs text-zinc-500 truncate hidden sm:block">{subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
              <Input
                placeholder="Search resumes, companies, roles..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-64 lg:w-80 pl-9 bg-zinc-900/60 border-zinc-800 placeholder:text-zinc-600 text-sm"
              />
              {search && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <Select value={categoryFilter} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-[130px] bg-zinc-900/60 border-zinc-800 text-sm h-9">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="all">All Categories</SelectItem>
                {DEFAULT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={onStatusChange}>
              <SelectTrigger className="w-[140px] bg-zinc-900/60 border-zinc-800 text-sm h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="all">All Statuses</SelectItem>
                {STATUS_ORDER.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-zinc-400 hover:text-white hidden md:flex"
              >
                <Filter className="h-3.5 w-3.5 mr-1.5" />
                Clear
              </Button>
            )}
          </div>
        </div>

        <div className="sm:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 bg-zinc-900/60 border-zinc-800 placeholder:text-zinc-600 text-sm"
            />
          </div>
        </div>

        {hasFilters && (
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            {search && (
              <Badge
                variant="outline"
                className="bg-zinc-900/60 border-zinc-800 text-zinc-400 gap-1"
              >
                Search: &ldquo;{search}&rdquo;
              </Badge>
            )}
            {categoryFilter !== 'all' && (
              <Badge
                variant="outline"
                className="bg-violet-500/10 border-violet-500/20 text-violet-300"
              >
                {categoryFilter}
              </Badge>
            )}
            {statusFilter !== 'all' && (
              <Badge
                variant="outline"
                className={cn(
                  'border-zinc-800',
                  statusFilter === 'Offer' && 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
                  statusFilter === 'Interview' && 'bg-violet-500/10 border-violet-500/20 text-violet-300',
                  statusFilter === 'Rejected' && 'bg-rose-500/10 border-rose-500/20 text-rose-300',
                  statusFilter === 'Applied' && 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300',
                  statusFilter === 'Wishlist' && 'bg-zinc-500/10 border-zinc-500/20 text-zinc-300',
                  statusFilter === 'Preparing' && 'bg-sky-500/10 border-sky-500/20 text-sky-300',
                  statusFilter === 'Online Assessment' && 'bg-amber-500/10 border-amber-500/20 text-amber-300',
                )}
              >
                {statusFilter}
              </Badge>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-zinc-500 hover:text-zinc-300 ml-1"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
