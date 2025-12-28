export type CertificateStatus = 'Issued' | 'Pending' | 'Rejected';
export type CertificateType = 'Bonafide' | 'Transfer' | 'Course Completion' | 'Merit' | 'Participation';
export type FileFormat = 'PDF' | 'JPG' | 'PNG';

export interface Certificate {
  id: string;
  studentName: string;
  certificateType: CertificateType;
  courseDepartment: string;
  issueDate: string;
  status: CertificateStatus;
  fileFormat: FileFormat;
}

// Generate mock certificates for demo purposes
const departments = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Business Administration',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics'
];

const firstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan',
  'Ananya', 'Diya', 'Saanvi', 'Aadhya', 'Kavya', 'Riya', 'Priya', 'Neha', 'Shreya', 'Pooja',
  'Rahul', 'Amit', 'Pradeep', 'Suresh', 'Rajesh', 'Vikram', 'Kiran', 'Mohan', 'Deepak', 'Sanjay'
];

const lastNames = [
  'Sharma', 'Verma', 'Patel', 'Gupta', 'Singh', 'Kumar', 'Reddy', 'Joshi', 'Rao', 'Nair',
  'Iyer', 'Menon', 'Pillai', 'Das', 'Bose', 'Sen', 'Roy', 'Mukherjee', 'Chatterjee', 'Banerjee'
];

const certificateTypes: CertificateType[] = ['Bonafide', 'Transfer', 'Course Completion', 'Merit', 'Participation'];
const statuses: CertificateStatus[] = ['Issued', 'Pending', 'Rejected'];
const fileFormats: FileFormat[] = ['PDF', 'JPG', 'PNG'];

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateCertificateId(index: number): string {
  const year = 2020 + Math.floor(index / 100);
  const num = (index % 10000).toString().padStart(4, '0');
  return `CERT-${year}-${num}`;
}

function generateRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

export function generateMockCertificates(count: number = 500): Certificate[] {
  const certificates: Certificate[] = [];
  
  for (let i = 0; i < count; i++) {
    const status = randomChoice(statuses);
    // Weighted distribution: 70% Issued, 20% Pending, 10% Rejected
    const weightedStatus = Math.random() < 0.7 ? 'Issued' : Math.random() < 0.67 ? 'Pending' : 'Rejected';
    
    certificates.push({
      id: generateCertificateId(i),
      studentName: `${randomChoice(firstNames)} ${randomChoice(lastNames)}`,
      certificateType: randomChoice(certificateTypes),
      courseDepartment: randomChoice(departments),
      issueDate: generateRandomDate(new Date(2020, 0, 1), new Date()),
      status: weightedStatus,
      fileFormat: randomChoice(fileFormats),
    });
  }
  
  return certificates;
}

export const mockCertificates = generateMockCertificates(500);