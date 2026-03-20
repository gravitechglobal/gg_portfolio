import { getAllCourseSlugs, getCourseBySlug } from "@/data/courseLoader";
import CourseDetailClient from "@/components/CourseDetailClient";

export function generateStaticParams() {
    return getAllCourseSlugs().map((slug) => ({ slug }));
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const course = getCourseBySlug(slug);

    // Provide a basic 404 fallback here if it wasn't found
    if (!course) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                <h2>Course not found</h2>
            </div>
        );
    }

    return <CourseDetailClient course={course} />;
}
