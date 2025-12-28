import { Search, X, Calendar, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchFilters as SearchFiltersType } from '@/hooks/useCertificateSearch';
import { CertificateStatus, CertificateType } from '@/data/certificates';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFilterChange: (filters: Partial<SearchFiltersType>) => void;
  onClearFilters: () => void;
  totalResults: number;
}

const certificateTypes: (CertificateType | 'all')[] = ['all', 'Bonafide', 'Transfer', 'Course Completion', 'Merit', 'Participation'];
const statuses: (CertificateStatus | 'all')[] = ['all', 'Issued', 'Pending', 'Rejected'];

export function SearchFilters({ filters, onFilterChange, onClearFilters, totalResults }: SearchFiltersProps) {
  const hasActiveFilters = filters.searchQuery || 
    filters.certificateType !== 'all' || 
    filters.status !== 'all' || 
    filters.dateFrom || 
    filters.dateTo;

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-4 md:p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h2 className="font-semibold text-foreground">Search & Filter</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="ml-auto text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
            Search by ID or Name
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter certificate ID or student name..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Certificate Type */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
            Certificate Type
          </label>
          <Select
            value={filters.certificateType}
            onValueChange={(value) => onFilterChange({ certificateType: value as CertificateType | 'all' })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {certificateTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
            Status
          </label>
          <Select
            value={filters.status}
            onValueChange={(value) => onFilterChange({ status: value as CertificateStatus | 'all' })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
            Date Range
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => onFilterChange({ dateFrom: e.target.value })}
                className="pl-10 text-sm"
              />
            </div>
            <div className="relative flex-1">
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => onFilterChange({ dateTo: e.target.value })}
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Found <span className="font-semibold text-foreground">{totalResults}</span> certificate{totalResults !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}