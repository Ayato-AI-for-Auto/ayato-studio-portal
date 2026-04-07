'use client';

import React, { useEffect, useState } from 'react';
import { fetchReportByFilename } from '../lib/api';
import { Report } from "@/lib/types";
import ReportView from './ReportView';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Props {
    id: string;
}

export default function ReportDetailPageClientFallback({ id }: Props) {
    const [report, setReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        fetchReportByFilename(id)
            .then((data) => {
                if (isMounted) {
                    if (data) {
                        setReport(data);
                    } else {
                        setError('Not Found');
                    }
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    console.error('Client-side fetch error:', err);
                    setError('Fetch Error');
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                    <p className="text-gray-400 font-bold animate-pulse">Syncing Intelligence...</p>
                </div>
            </div>
        );
    }

    if (error === 'Not Found' || !report) {
        return notFound();
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-center">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Connection Issue</h2>
                    <p className="text-gray-400 mb-6">Failed to retrieve the report. Please try again later.</p>
                    <Link href="/" className="text-blue-400 font-bold">Back to Home</Link>
                </div>
            </div>
        );
    }

    return <ReportView report={report} />;
}
