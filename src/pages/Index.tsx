import { useState } from 'react';
import { Award, FileSearch } from 'lucide-react';
import { SearchFilters } from '@/components/certificates/SearchFilters';
import { CertificateTable } from '@/components/certificates/CertificateTable';
import { Pagination } from '@/components/certificates/Pagination';
import { CertificateModal } from '@/components/certificates/CertificateModal';
import { useCertificateSearch } from '@/hooks/useCertificateSearch';
import { Certificate } from '@/data/certificates';

const Index = () => {
  const {
    filters,
    updateFilters,
    clearFilters,
    sortField,
    sortDirection,
    handleSort,
    currentPage,
    setCurrentPage,
    totalPages,
    totalResults,
    certificates,
  } = useCertificateSearch();

  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Award className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Certificate Finder</h1>
              <p className="text-sm text-muted-foreground">
                Search and manage certificates from your institution
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 space-y-6">
        {/* Search Filters */}
        <SearchFilters
          filters={filters}
          onFilterChange={updateFilters}
          onClearFilters={clearFilters}
          totalResults={totalResults}
        />

        {/* Results Table */}
        <CertificateTable
          certificates={certificates}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onView={handleViewCertificate}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>

      {/* Certificate Detail Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;