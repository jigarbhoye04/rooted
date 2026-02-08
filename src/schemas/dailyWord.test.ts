import { describe, it, expect } from 'vitest';
import { DailyWordSchema } from './dailyWord';

describe('DailyWordSchema', () => {
    const validWord = {
        id: 1,
        publish_date: '2026-02-08',
        word: 'Coffee',
        definition: 'A dark brown drink...',
        phonetic: '/ˈkɔːfi/',
        visualization_type: 'MAP',
        content_json: {
            hook: 'Brewing with history...',
            fun_fact: 'Coffee was once banned in Mecca.',
            visual_data: { some: 'data' }
        },
        accent_color: '#6F4E37',
        created_at: '2026-02-08T09:05:53Z',
        approved_by: 'jigar',
        root_family: 'SEMITIC_qahwa'
    };

    it('should validate a correct word object', () => {
        const result = DailyWordSchema.safeParse(validWord);
        if (!result.success) console.log(result.error.issues);
        expect(result.success).toBe(true);
    });

    it('should allow nullable optional fields', () => {
        const minimalWord = {
            ...validWord,
            phonetic: null,
            pronunciation_audio_url: null,
            created_at: null,
            approved_by: null,
            root_family: null
        };
        const result = DailyWordSchema.safeParse(minimalWord);
        expect(result.success).toBe(true);
    });

    it('should fail if required fields are missing', () => {
        const invalidWord = { ...validWord };
        delete (invalidWord as any).word;
        const result = DailyWordSchema.safeParse(invalidWord);
        expect(result.success).toBe(false);
    });

    it('should fail if visualization_type is invalid', () => {
        const invalidWord = {
            ...validWord,
            visualization_type: 'INVALID'
        };
        const result = DailyWordSchema.safeParse(invalidWord);
        expect(result.success).toBe(false);
    });

    it('should fail if accent_color is not a hex code', () => {
        const invalidWord = {
            ...validWord,
            accent_color: 'red'
        };
        const result = DailyWordSchema.safeParse(invalidWord);
        expect(result.success).toBe(false);
    });
});
