import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";

import { trpc } from "../../../lib/trpc";

interface ThemeSelectProps {
    value: number | null;
    onChange: (themeId: number) => void;
    disabled?: boolean;
    error?: string;
    className?: string;
}

const ThemeSelect = ({
    value,
    onChange,
    disabled,
    error,
    className,
}: ThemeSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [newThemeName, setNewThemeName] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const { data: themes = [], refetch } = trpc.getThemes.useQuery();
    const createTheme = trpc.createTheme.useMutation();

    const filteredThemes = themes.filter((theme) =>
        theme.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const selectedTheme = themes.find((theme) => theme.id === value);

    const handleCreateTheme = async () => {
        if (!newThemeName.trim()) return;

        try {
            const newTheme = await createTheme.mutateAsync({
                name: newThemeName.trim(),
            });
            onChange(newTheme.id);
            setNewThemeName("");
            setIsCreating(false);
            setIsOpen(false);
            refetch();
        } catch (error) {
            console.error("Ошибка создания темы:", error);
        }
    };

    return (
        <div className={`relative ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Тема
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={`w-full px-3 py-2 border rounded-lg text-left bg-white flex items-center justify-between ${
                        error ? "border-red-500" : "border-gray-300"
                    } ${disabled ? "bg-gray-100 cursor-not-allowed" : "hover:border-gray-400"}`}
                >
                    <span
                        className={
                            selectedTheme ? "text-gray-900" : "text-gray-500"
                        }
                    >
                        {selectedTheme ? selectedTheme.name : "Выберите тему"}
                    </span>
                    <ChevronDown
                        size={20}
                        className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <div className="p-2">
                            <input
                                type="text"
                                placeholder="Поиск темы..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                        </div>

                        <div className="max-h-48 overflow-y-auto">
                            {filteredThemes.map((theme) => (
                                <button
                                    key={theme.id}
                                    type="button"
                                    onClick={() => {
                                        onChange(theme.id);
                                        setIsOpen(false);
                                        setSearchQuery("");
                                    }}
                                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center justify-between"
                                >
                                    <span>{theme.name}</span>
                                    <span className="text-sm text-gray-500">
                                        {theme._count.cards} карточек
                                    </span>
                                </button>
                            ))}
                        </div>

                        {searchQuery &&
                            !filteredThemes.some(
                                (theme) =>
                                    theme.name.toLowerCase() ===
                                    searchQuery.toLowerCase(),
                            ) && (
                                <div className="border-t border-gray-200 p-2">
                                    {!isCreating ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setNewThemeName(searchQuery);
                                                setIsCreating(true);
                                            }}
                                            className="w-full px-3 py-2 text-left text-blue-600 hover:bg-blue-50 flex items-center"
                                        >
                                            <Plus size={16} className="mr-2" />
                                            Создать тему "{searchQuery}"
                                        </button>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={newThemeName}
                                                onChange={(e) =>
                                                    setNewThemeName(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Название новой темы"
                                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                                                maxLength={20}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleCreateTheme}
                                                disabled={
                                                    newThemeName.length < 3
                                                }
                                                className="px-2 py-1 bg-blue-600 text-white rounded text-sm disabled:opacity-50"
                                            >
                                                Создать
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsCreating(false);
                                                    setNewThemeName("");
                                                }}
                                                className="px-2 py-1 border border-gray-300 rounded text-sm"
                                            >
                                                Отмена
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                    </div>
                )}
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default ThemeSelect;
