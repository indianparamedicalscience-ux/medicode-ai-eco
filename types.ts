
export interface MedicalCode {
  code: string;
  description: string;
  type: 'ICD-10' | 'CPT' | 'Unknown';
  justification?: string;
  details?: string;
}
