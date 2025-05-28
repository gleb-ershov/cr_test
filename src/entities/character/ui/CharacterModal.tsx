import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSingleCharacter } from "../api/useSingleCharacter";
import { LoadingSpinner } from "@/components/ui/loader";

export function CharacterModal() {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const { data, isLoading, error } = useSingleCharacter(id);

	return (
		<Dialog open onOpenChange={() => navigate("/characters")}>
			<DialogContent>
				<h2 className="text-xl font-semibold mb-2">Детали персонажа</h2>

				{isLoading && <LoadingSpinner className="w-6 h-6 mx-auto" />}

				{error && (
					<p className="text-red-500">
						Произошла ошибка: {error.message}
					</p>
				)}

				{!isLoading && data && (
					<div>
						<p>
							<strong>Имя:</strong> {data.name}
						</p>
						<p>
							<strong>Пол:</strong> {data.gender}
						</p>
						<p>
							<strong>Рост:</strong> {data.height} см
						</p>
						<p>
							<strong>Вес:</strong> {data.mass} кг
						</p>
						<p>
							<strong>Цвет глаз:</strong> {data.eye_color}
						</p>
						<p>
							<strong>Цвет волос:</strong> {data.hair_color}
						</p>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
