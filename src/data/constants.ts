import { SectionConfig, ProjectData, PipelineNodeData, ContactData } from '../types';

export const SECTIONS: SectionConfig[] = [
  { id: 'landing', label: 'Home', camera: { position: [0, 0, 10], lookAt: [0, 0, 0], fov: 55 }, mobileCameraDistance: 0.7 },
  { id: 'pipeline', label: 'Experience', camera: { position: [0, -15, 10], lookAt: [0, -15, 0], fov: 55 }, mobileCameraDistance: 0.7 },
  { id: 'serverRoom', label: 'Projects', camera: { position: [0, -30, 12], lookAt: [0, -30, 0], fov: 55 }, mobileCameraDistance: 0.7 },
  { id: 'education', label: 'Education', camera: { position: [0, -45, 10], lookAt: [0, -45, 0], fov: 55 }, mobileCameraDistance: 0.7 },
];

export const PROJECTS: ProjectData[] = [
  {
    id: 'etl',
    title: 'Automated ETL & Data Quality Pipeline',
    technologies: ['Python', 'Airflow', 'AWS S3', 'Athena', 'SNS'],
    achievement: '60% latency reduction',
    description: 'Production ETL pipelines with automated data quality checks, achieving 60% reduction in processing latency.',
  },
  {
    id: 'monitoring',
    title: 'Real-Time Log Monitoring System',
    technologies: ['Java', 'Kafka', 'PostgreSQL', 'Grafana', 'Prometheus'],
    achievement: 'Kafka consumer group integration',
    description: 'Real-time distributed log monitoring with Kafka consumer groups for high-throughput processing and alerting.',
  },
  {
    id: 'ai',
    title: 'Agentic AI Web Application',
    technologies: ['Amazon Q', 'Kiro', 'MCP', 'REST APIs'],
    achievement: 'Hackathon Winner',
    description: 'Agentic AI application leveraging Amazon Q and MCP for intelligent automation via REST APIs.',
  },
];

export const SKILLS: string[] = [
  'Python', 'Docker', 'AWS', 'Scala', 'SQL',
  'Apache Spark', 'Bash', 'Kafka', 'CI/CD', 'Java',
  'Airflow', 'Linux', 'Hive', 'Git', 'Iceberg',
  'MySQL', 'PostgreSQL', 'DynamoDB', 'Cassandra',
];

export const PIPELINE_NODES: PipelineNodeData[] = [
  {
    id: 'etl-pipelines',
    label: '10+ ETL Pipelines',
    tooltip: '10+ production ETL pipelines',
    details: 'Designed and deployed 10+ production ETL pipelines processing enterprise-scale data with automated monitoring and alerting.',
    position: [-3, 0, 0],
  },
  {
    id: 'daily-records',
    label: '5M+ Daily Records',
    tooltip: '5M+ daily records processed',
    details: 'Engineered data infrastructure processing 5M+ daily records with 99.9% reliability and automated recovery.',
    position: [-1, 0, 0],
  },
  {
    id: 'failure-reduction',
    label: '35% Failure Reduction',
    tooltip: '35% failure reduction via Airflow',
    details: 'Reduced pipeline failure rate by 35% through Airflow DAGs with intelligent retry logic and dependency management.',
    position: [1, 0, 0],
  },
  {
    id: 's3-datalake',
    label: 'S3 Data Lake + Iceberg',
    tooltip: 'S3 Data Lake with Iceberg',
    details: 'Architected Amazon S3 Data Lake using Apache Iceberg table format for schema evolution and time-travel queries.',
    position: [3, 0, 0],
  },
];

export const CONTACT: ContactData = {
  email: 'chiragmaheshwari675@gmail.com',
  phone: '+91 7717336590',
  linkedin: 'https://www.linkedin.com/in/chirag-maheshwari-65b093270',
  availability: 'Seeking Full-Time: Data Engineering • AWS Cloud • Software Engineering | Immediate Joiner',
};

export const ABOUT_ME = `Passionate Data Engineer with 1+ year of hands-on production experience building scalable data infrastructure at Nielsen. I specialize in designing and deploying high-throughput ETL pipelines, real-time streaming architectures, and cloud-native data platforms on AWS.`;

export const EDUCATION = {
  degree: 'B.E. Computer Science',
  institution: 'Chitkara University',
  yearRange: '2022 - 2026',
  cgpa: '9.39/10',
  tenth: '97.84%',
  twelfth: '95%',
};

export const CERTIFICATIONS = [
  { name: 'Apache Airflow', owner: 'Astronomer', link: '' },
  { name: 'Apache Spark with Scala', owner: 'Udemy', link: '' },
  { name: 'AWS Cloud Practitioner', owner: 'Amazon Web Services', link: '' },
];

export const LEETCODE = '300+ problems solved on LeetCode';
