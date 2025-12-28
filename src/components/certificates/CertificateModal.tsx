import { X, Download, FileText, User, Calendar, Building, Award } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Certificate } from '@/data/certificates';
import { StatusBadge } from './StatusBadge';
import { TypeBadge } from './TypeBadge';
import { toast } from '@/hooks/use-toast';

interface CertificateModalProps {
  certificate: Certificate | null;
  open: boolean;
  onClose: () => void;
}

export function CertificateModal({ certificate, open, onClose }: CertificateModalProps) {
  if (!certificate) return null;

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: `Downloading ${certificate.id}.${certificate.fileFormat.toLowerCase()}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Certificate Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Certificate Preview Placeholder */}
          <div className="bg-muted rounded-lg border-2 border-dashed border-border p-8 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Certificate Preview</p>
            <p className="text-xs text-muted-foreground mt-1">{certificate.fileFormat} format</p>
          </div>

          {/* Certificate Info */}
          <div className="grid gap-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Certificate ID</p>
                <p className="font-mono font-semibold text-primary">{certificate.id}</p>
              </div>
              <StatusBadge status={certificate.status} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Student Name</p>
                  <p className="font-medium">{certificate.studentName}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Building className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">{certificate.courseDepartment}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Award className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <div className="mt-0.5">
                    <TypeBadge type={certificate.certificateType} />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Issue Date</p>
                  <p className="font-medium">
                    {new Date(certificate.issueDate).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              onClick={handleDownload}
              disabled={certificate.status !== 'Issued'}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>

          {certificate.status !== 'Issued' && (
            <p className="text-sm text-muted-foreground text-center">
              {certificate.status === 'Pending' 
                ? 'This certificate is pending approval and cannot be downloaded yet.'
                : 'This certificate request was rejected.'}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}