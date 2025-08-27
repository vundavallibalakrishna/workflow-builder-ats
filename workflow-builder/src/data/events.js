export const events = {
  submission: [
    { id: 'submission_created', name: 'Created' },
    { id: 'submission_updated', name: 'Updated' },
    { id: 'rtr_sent', name: 'RTR Sent' },
    { id: 'rtr_received', name: 'RTR Received' },
    { id: 'stage_status_updated', name: 'Stage or Status Updated' },
  ],
  mapping: [
    { id: 'mapping_created', name: 'Created' },
  ],
  application: [
    { id: 'application_received', name: 'Received' },
  ],
  candidate: [
    { id: 'candidate_created', name: 'Created' },
    { id: 'candidate_updated', name: 'Updated' },
    { id: 'candidate_marked_dnc', name: 'Marked DNC' },
    { id: 'candidate_cv_uploaded', name: 'CV Uploaded' },
    { id: 'candidate_imported', name: 'Imported from Jobboard' },
  ],
  job: [
    { id: 'job_created', name: 'Created' },
    { id: 'job_updated', name: 'Updated' },
  ],
};
