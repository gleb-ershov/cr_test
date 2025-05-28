import { useQuery } from "@tanstack/react-query";
import type { Character } from "../model/types";

export function useSingleCharacter(id?: string) {
    return useQuery({
        queryKey: ["character", id],
        queryFn: async () => {
            if (!id) throw new Error("Нет ID персонажа");

            const res = await fetch(`https://www.swapi.tech/api/people/${id}`);
            if (!res.ok) throw new Error("Ошибка загрузки данных персонажа");

            const data = await res.json();
            return data.result.properties as Character;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
}

