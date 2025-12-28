import { ArrowUpDown, ArrowUp, ArrowDown, Eye, Download, FileText } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Certificate } from '@/data/certificates';
import { SortField, SortDirection } from '@/hooks/useCertificateSearch';
import { StatusBadge } from './StatusBadge';
import { TypeBadge } from './TypeBadge';
import { toast } from '@/hooks/use-toast';

interface CertificateTableProps {
  certificates: Certificate[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onView: (certificate: Certificate) => void;
}

function SortIcon({ field, currentField, direction }: { field: SortField; currentField: SortField; direction: SortDirection }) {
  if (field !== currentField) {
    return <ArrowUpDown className="ml-1 h-4 w-4 text-muted-foreground" />;
  }
  return direction === 'asc' 
    ? <ArrowUp className="ml-1 h-4 w-4 text-primary" />
    : <ArrowDown className="ml-1 h-4 w-4 text-primary" />;
}

function SortableHeader({ 
  field, 
  label, 
  currentField, 
  direction, 
  onSort 
}: { 
  field: SortField; 
  label: string; 
  currentField: SortField; 
  direction: SortDirection; 
  onSort: (field: SortField) => void;
}) {
  return (
    <TableHead>
      <button
        onClick={() => onSort(field)}
        className="flex items-center font-medium hover:text-primary transition-colors"
      >
        {label}
        <SortIcon field={field} currentField={currentField} direction={direction} />
      </button>
    </TableHead>
  );
}

export function CertificateTable({ certificates, sortField, sortDirection, onSort, onView }: CertificateTableProps) {
  const handleDownload = (certificate: Certificate) => {
    // Simulate download
    toast({
      title: "Download Started",
      description: `Downloading ${certificate.id}.${certificate.fileFormat.toLowerCase()}`,
    });
  };

  if (certificates.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-sm p-12 text-center animate-fade-in">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No certificates found</h3>
        <p className="text-muted-foreground">Try adjusting your search filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <SortableHeader field="id" label="Certificate ID" currentField={sortField} direction={sortDirection} onSort={onSort} />
              <SortableHeader field="studentName" label="Student Name" currentField={sortField} direction={sortDirection} onSort={onSort} />
              <SortableHeader field="certificateType" label="Type" currentField={sortField} direction={sortDirection} onSort={onSort} />
              <TableHead>Department</TableHead>
              <SortableHeader field="issueDate" label="Issue Date" currentField={sortField} direction={sortDirection} onSort={onSort} />
              <SortableHeader field="status" label="Status" currentField={sortField} direction={sortDirection} onSort={onSort} />
              <TableHead>Format</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.map((cert) => (
              <TableRow key={cert.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-mono text-sm font-medium text-primary">
                  {cert.id}
                </TableCell>
                <TableCell className="font-medium">{cert.studentName}</TableCell>
                <TableCell>
                  <TypeBadge type={cert.certificateType} />
                </TableCell>
                <TableCell className="text-muted-foreground">{cert.courseDepartment}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(cert.issueDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </TableCell>
                <TableCell>
                  <StatusBadge status={cert.status} />
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-xs font-medium">
                    {cert.fileFormat}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(cert)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(cert)}
                      disabled={cert.status !== 'Issued'}
                      className="h-8 w-8 p-0"
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}