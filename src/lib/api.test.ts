import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchReports } from './api';

// Mock Supabase client
const mockSelect = vi.fn();
const mockFrom = vi.fn(() => ({ select: mockSelect }));

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: mockFrom
  }))
}));

describe('fetchReports', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and map reports correctly', async () => {
    mockSelect.mockReturnValue({
      order: vi.fn(() => ({
        limit: vi.fn(() => Promise.resolve({
          data: [
            {
              title: 'Test Report',
              content_md: 'Test Content',
              language: 'en',
              market: 'AI/Tech',
              item_id: 'test-123',
              generated_at: '2026-03-28T12:00:00Z',
              raw_items: {
                category: 'Tech',
                market: 'AI',
                url: 'https://example.com'
              }
            }
          ],
          error: null
        }))
      }))
    });

    const reports = await fetchReports();
    expect(reports).toHaveLength(1);
    expect(reports[0].title).toBe('Test Report');
    expect(reports[0].filename).toBe('test-123');
    expect(reports[0].category).toBe('Tech');
  });

  it('should handle zero reports', async () => {
    mockSelect.mockReturnValue({
      order: vi.fn(() => ({
        limit: vi.fn(() => Promise.resolve({
          data: [],
          error: null
        }))
      }))
    });

    const reports = await fetchReports();
    expect(reports).toHaveLength(0);
  });

  it('should throw error on Supabase error', async () => {
    mockSelect.mockReturnValue({
      order: vi.fn(() => ({
        limit: vi.fn(() => Promise.resolve({
          data: null,
          error: { message: 'Fetch failed' }
        }))
      }))
    });

    await expect(fetchReports()).rejects.toThrow('Failed to fetch reports from Supabase');
  });
});
