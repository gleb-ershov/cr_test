import { useQuery } from "@tanstack/react-query";
import type { Character } from "../model/types";

type CharactersResponse = {
    results: Character[];
    previous: string | null;
    next: string | null;
};

export function useCharacters(
    page: number,
    name: string,
    genderFilter: string | null
) {
    return useQuery<CharactersResponse>({
        queryKey: ["characters", page, name, genderFilter],
        queryFn: async () => {
            const res = await fetch(
                `https://www.swapi.tech/api/people?page=${page}&limit=10`
            );
            const data = await res.json();

            // Получаем детали для каждого персонажа параллельно
            const detailedResultsRaw = await Promise.all(
                data.results.map(async (c: Character) => {
                    try {
                        const detailRes = await fetch(c.url);
                        if (!detailRes.ok)
                            throw new Error(`Ошибка загрузки данных персонажа по URL ${c.url}`);
                        const detailData = await detailRes.json();
                        return detailData.result.properties as Character;
                    } catch (e) {
                        console.warn("Ошибка загрузки детали персонажа:", e);
                        return null;
                    }
                })
            );

            // Фильтруем null (ошибочные загрузки)
            const detailedResults = detailedResultsRaw.filter(
                (c): c is Character => c !== null
            );

            // Фильтрация по имени
            let filteredResults = detailedResults;
            if (name) {
                filteredResults = filteredResults.filter((p) =>
                    p.name.toLowerCase().includes(name.toLowerCase())
                );
            }

            // Фильтрация по полу (если задан)
            if (genderFilter && genderFilter !== "all") {
                filteredResults = filteredResults.filter((p) => p.gender === genderFilter);
            }

            return {
                results: filteredResults,
                previous: data.previous ?? null,
                next: data.next ?? null,
            };
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
}
