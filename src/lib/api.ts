export interface Report {
    title: string;
    content: string;
    category: string;
    market: string;
    language: string;
    score: number;
    filename: string;
    timestamp: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchReports(): Promise<Report[]> {
    const response = await fetch(`${API_BASE_URL}/api/v1/reports`, {
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch reports");
    }
    return response.json();
}
