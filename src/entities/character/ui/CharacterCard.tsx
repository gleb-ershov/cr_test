import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import type { Character } from "../model/types";

interface CharacterCardProps {
	character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
	const id = character.url.match(/\/people\/(\d+)$/)?.[1];
	return (
		<Link to={`/characters/${id}`}>
			<Card className="bg-zinc-200 hover:bg-zinc-300 transition-colors">
				<CardContent>
					<h2 className="text-lg font-semibold">{character.name}</h2>
					<p>Пол: {character.gender}</p>
					<p>Год рождения: {character.birth_year}</p>
				</CardContent>
			</Card>
		</Link>
	);
}
