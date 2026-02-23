import {
    Brain,
    Cloud,
    Code2,
    Database,
    Lock,
    Palette,
    Server,
    Smartphone,
} from "lucide-react";

export interface Course {
    id: string;
    title: string;
    description: string;
    category: string;
    icon: typeof Brain;
    price: string;
    duration: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    accent: string;
}

export const courses: Course[] = [
    {
        id: "ai-ml",
        title: "AI & Machine Learning",
        description:
            "Master neural networks, deep learning, and production ML pipelines with hands-on projects.",
        category: "Artificial Intelligence",
        icon: Brain,
        price: "$899",
        duration: "16 weeks",
        level: "Advanced",
        accent: "#8B5CF6",
    },
    {
        id: "cloud-arch",
        title: "Cloud Architecture",
        description:
            "Design scalable, resilient cloud infrastructure on AWS, Azure, and GCP.",
        category: "Cloud Computing",
        icon: Cloud,
        price: "$749",
        duration: "12 weeks",
        level: "Intermediate",
        accent: "#3B82F6",
    },
    {
        id: "fullstack",
        title: "Full-Stack Engineering",
        description:
            "Build production-ready web applications from frontend to backend, databases to deployment.",
        category: "Development",
        icon: Code2,
        price: "$699",
        duration: "20 weeks",
        level: "Intermediate",
        accent: "#10B981",
    },
    {
        id: "cybersec",
        title: "Cybersecurity Mastery",
        description:
            "Learn penetration testing, threat modeling, and enterprise security architecture.",
        category: "Security",
        icon: Lock,
        price: "$849",
        duration: "14 weeks",
        level: "Advanced",
        accent: "#EF4444",
    },
    {
        id: "data-eng",
        title: "Data Engineering",
        description:
            "Build ETL pipelines, data lakes, and real-time streaming architectures at scale.",
        category: "Data",
        icon: Database,
        price: "$799",
        duration: "14 weeks",
        level: "Advanced",
        accent: "#F59E0B",
    },
    {
        id: "devops",
        title: "DevOps & SRE",
        description:
            "Master CI/CD, Kubernetes, Terraform, and observability for production systems.",
        category: "Operations",
        icon: Server,
        price: "$699",
        duration: "12 weeks",
        level: "Intermediate",
        accent: "#06B6D4",
    },
    {
        id: "mobile-dev",
        title: "Mobile Development",
        description:
            "Create cross-platform mobile apps with React Native and Flutter.",
        category: "Development",
        icon: Smartphone,
        price: "$649",
        duration: "14 weeks",
        level: "Intermediate",
        accent: "#EC4899",
    },
    {
        id: "ux-design",
        title: "UX/UI Design Systems",
        description:
            "Design accessible, scalable design systems and craft world-class user experiences.",
        category: "Design",
        icon: Palette,
        price: "$599",
        duration: "10 weeks",
        level: "Beginner",
        accent: "#F97316",
    },
];

export const categories = Array.from(
    new Set(courses.map((c) => c.category))
);
