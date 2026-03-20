import fs from 'fs';
import path from 'path';

export interface ModuleDataJSON {
    id: number;
    title: string;
    duration: string;
    icon: string;
    service?: string;
    topics: string[];
    handsOn?: string[];
    learningOutcome?: string;
}

export interface CourseTierJSON {
    label: string;
    description: string;
    modules: ModuleDataJSON[];
}

export interface CourseDetailJSON {
    title: string;
    subtitle: string;
    level: string;
    sessionDuration: string;
    totalDays: number | string;
    accent: string;
    tiers: CourseTierJSON[];
}

/**
 * Get all available course slugs from the JSON files in src/data/courses
 */
export function getAllCourseSlugs(): string[] {
    const coursesDir = path.join(process.cwd(), 'src/data/courses');
    if (!fs.existsSync(coursesDir)) return [];
    
    const files = fs.readdirSync(coursesDir);
    return files
        .filter(file => file.endsWith('.json'))
        .map(file => file.replace('.json', ''));
}

/**
 * Load a specific course by slug, return CourseDetailJSON
 */
export function getCourseBySlug(slug: string): CourseDetailJSON | null {
    const filePath = path.join(process.cwd(), 'src/data/courses', `${slug}.json`);
    
    if (!fs.existsSync(filePath)) {
        return null;
    }

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent) as CourseDetailJSON;
    } catch (error) {
        console.error(`Error loading course data for ${slug}:`, error);
        return null;
    }
}
