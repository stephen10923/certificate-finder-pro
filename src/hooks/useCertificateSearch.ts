import { useState, useMemo, useCallback } from 'react';
import { Certificate, mockCertificates, CertificateStatus, CertificateType } from '@/data/certificates';

export interface SearchFilters {
  searchQuery: string;
  certificateType: CertificateType | 'all';
  status: CertificateStatus | 'all';
  dateFrom: string;
  dateTo: string;
}

export type SortField = 'id' | 'studentName' | 'certificateType' | 'issueDate' | 'status';
export type SortDirection = 'asc' | 'desc';

const ITEMS_PER_PAGE = 10;

export function useCertificateSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    searchQuery: '',
    certificateType: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: '',
  });
  
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCertificates = useMemo(() => {
    let result = [...mockCertificates];
    
    // Search query filter (searches in ID and student name)
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(cert => 
        cert.id.toLowerCase().includes(query) ||
        cert.studentName.toLowerCase().includes(query)
      );
    }
    
    // Certificate type filter
    if (filters.certificateType !== 'all') {
      result = result.filter(cert => cert.certificateType === filters.certificateType);
    }
    
    // Status filter
    if (filters.status !== 'all') {
      result = result.filter(cert => cert.status === filters.status);
    }
    
    // Date range filter
    if (filters.dateFrom) {
      result = result.filter(cert => cert.issueDate >= filters.dateFrom);
    }
    if (filters.dateTo) {
      result = result.filter(cert => cert.issueDate <= filters.dateTo);
    }
    
    // Sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'id':
          comparison = a.id.localeCompare(b.id);
          break;
        case 'studentName':
          comparison = a.studentName.localeCompare(b.studentName);
          break;
        case 'certificateType':
          comparison = a.certificateType.localeCompare(b.certificateType);
          break;
        case 'issueDate':
          comparison = a.issueDate.localeCompare(b.issueDate);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    return result;
  }, [filters, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredCertificates.length / ITEMS_PER_PAGE);
  
  const paginatedCertificates = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCertificates.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCertificates, currentPage]);

  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page on filter change
  }, []);

  const handleSort = useCallback((field: SortField) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField]);

  const clearFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      certificateType: 'all',
      status: 'all',
      dateFrom: '',
      dateTo: '',
    });
    setCurrentPage(1);
  }, []);

  return {
    filters,
    updateFilters,
    clearFilters,
    sortField,
    sortDirection,
    handleSort,
    currentPage,
    setCurrentPage,
    totalPages,
    totalResults: filteredCertificates.length,
    certificates: paginatedCertificates,
  };
}