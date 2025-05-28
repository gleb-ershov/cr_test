import { useCharacters } from "@/entities/character/api/useCharacters";
import { CharacterCard } from "@/entities/character/ui/CharacterCard";
import { Outlet, useSearchParams } from "react-router-dom";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

function CharactersFilterForm({
	name,
	genderFilter,
	onSearchChange,
	onGenderChange,
}: {
	name: string;
	genderFilter: string;
	onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onGenderChange: (value: string) => void;
}) {
	return (
		<div className="flex gap-4 mb-4">
			<Input
				placeholder="Поиск по имени"
				value={name}
				onChange={onSearchChange}
			/>
			<Select value={genderFilter} onValueChange={onGenderChange}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Пол" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">Все</SelectItem>
					<SelectItem value="male">Мужской</SelectItem>
					<SelectItem value="female">Женский</SelectItem>
					<SelectItem value="n/a">Неизвестно</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}

function CharactersList({
	data,
	isLoading,
}: {
	data: any;
	isLoading: boolean;
}) {
	if (isLoading) {
		return (
			<div className="grid grid-cols-2 gap-4">
				{Array.from({ length: 10 }).map((_, i) => (
					<Skeleton key={i} className="h-32" />
				))}
			</div>
		);
	}
	if (!data?.results?.length) return <p>Нет результатов</p>;
	return (
		<div className="grid grid-cols-2 gap-4">
			{data.results.map((character: any) => (
				<CharacterCard key={character.url} character={character} />
			))}
		</div>
	);
}

function CharactersPagination({
	page,
	hasPrev,
	hasNext,
	onPageChange,
}: {
	page: number;
	hasPrev: boolean;
	hasNext: boolean;
	onPageChange: (newPage: number) => void;
}) {
	return (
		<div className="flex justify-between mt-4">
			<Button
				variant="outline"
				disabled={!hasPrev}
				onClick={() => onPageChange(page - 1)}
			>
				Назад
			</Button>
			<Button
				variant="outline"
				disabled={!hasNext}
				onClick={() => onPageChange(page + 1)}
			>
				Вперед
			</Button>
		</div>
	);
}

export default function CharactersPage() {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = Number(searchParams.get("page") || 1);
	const name = searchParams.get("name") || "";
	const genderFilter = searchParams.get("gender") || "all";

	const { data, isLoading, error } = useCharacters(page, name, genderFilter);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchParams((params) => {
			params.set("page", "1");
			params.set("name", e.target.value);
			return params;
		});
	};

	const handleGenderChange = (genderValue: string) => {
		setSearchParams((params) => {
			params.set("page", "1");
			params.set("gender", genderValue);
			return params;
		});
	};

	const handlePageChange = (newPage: number) => {
		setSearchParams((params) => {
			params.set("page", String(newPage));
			return params;
		});
	};

	if (error) return <p>Ошибка: {(error as Error).message}</p>;

	return (
		<>
			<Outlet />
			<h1 className="text-2xl font-bold mb-4">Каталог персонажей</h1>
			<section className="mb-4 mx-auto max-w-3xl">
				<CharactersFilterForm
					name={name}
					genderFilter={genderFilter}
					onSearchChange={handleSearchChange}
					onGenderChange={handleGenderChange}
				/>
				<CharactersList data={data} isLoading={isLoading} />
				<CharactersPagination
					page={page}
					hasPrev={!!data?.previous}
					hasNext={!!data?.next}
					onPageChange={handlePageChange}
				/>
			</section>
		</>
	);
}
