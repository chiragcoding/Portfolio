export type SectionName = 'landing' | 'pipeline' | 'serverRoom' | 'education';

export interface CameraPosition {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

export interface SectionConfig {
  id: SectionName;
  label: string;
  camera: CameraPosition;
  mobileCameraDistance: number;
}

export interface ProjectData {
  id: string;
  title: string;
  technologies: string[];
  achievement: string;
  description: string;
}

export interface PipelineNodeData {
  id: string;
  label: string;
  tooltip: string;
  details: string;
  position: [number, number, number];
}

export interface ContactData {
  email: string;
  phone: string;
  linkedin: string;
  availability: string;
}
