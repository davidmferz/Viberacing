// Types based on JSON spec from the requirements

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

export interface Note {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  content: string;
}

export interface NoteFrontmatter {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
}

export interface NoteListItem {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
}
