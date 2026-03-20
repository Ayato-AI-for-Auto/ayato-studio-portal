import React from 'react';
import { fetchReportByFilename, fetchReports } from '@/lib/api';
import { notFound } from 'next/navigation';
import ReportView from '@/components/ReportView';

interface PageProps {
    params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export default async function ReportDetailPage({ params }: PageProps) {
    const { id } = await params;
    const report = await fetchReportByFilename(id);

    if (!report) {
        notFound();
    }

    return <ReportView report={report} />;
}

export async function generateStaticParams() {
    try {
        const reports = await fetchReports();
        return reports.map((report) => ({
            id: report.filename,
        }));
    } catch (error) {
        console.error('Failed to generate static params for reports:', error);
        return [];
    }
}
