// Types for the aggregator

export interface Metadata {
  version: string;
  profile: Profile;
  fileList: FileList;
}

export interface Profile {
  name: string;
  avatar?: string;
  contact?: Contact;
}

export interface Contact {
  github?: string;
  linkedin?: string;
  email?: string;
  twitter?: string;
  website?: string;
  other?: OtherContact[];
}

export interface OtherContact {
  platform: string;
  url: string;
  label?: string;
}

export interface FileList {
  url: string;
  format?: 'json' | 'xml' | 'csv';
  lastUpdated?: string;
}

export interface NoteListItem {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
}

export interface AggregatedNote extends NoteListItem {
  developer: Profile;
  sourceUrl: string;
  noteUrl: string;
}

export interface DeveloperSource {
  name: string;
  metadataUrl: string;
  color?: string;
}
