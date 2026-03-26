// Random draw (basic)
export function generateDraw() {
    let numbers: number[] = [];

    while (numbers.length < 5) {
        const num = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(num)) numbers.push(num);
    }

    return numbers;
}

// ✅ Weighted draw (ADVANCED)
export function generateWeightedDraw(scores: number[]) {
    const freq: Record<number, number> = {};

    scores.forEach((s) => {
        freq[s] = (freq[s] || 0) + 1;
    });

    const weighted: number[] = [];

    Object.entries(freq).forEach(([num, count]) => {
        for (let i = 0; i < count * 3; i++) {
            weighted.push(Number(num));
        }
    });

    while (weighted.length < 20) {
        weighted.push(Math.floor(Math.random() * 45) + 1);
    }

    const result = new Set<number>();

    while (result.size < 5) {
        const random =
            weighted[Math.floor(Math.random() * weighted.length)];
        result.add(random);
    }

    return Array.from(result);
}

// Match logic
export function checkMatches(userScores: number[], draw: number[]) {
    return userScores.filter((n) => draw.includes(n)).length;
}

// Result type
export function getMatchType(count: number) {
    if (count === 5) return "🏆 Jackpot (5 Match)";
    if (count === 4) return "🎯 4 Match";
    if (count === 3) return "✨ 3 Match";
    return "❌ No Win";
}