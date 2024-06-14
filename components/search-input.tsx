import { Input } from "@/components/ui/input";

export interface SearchInputProps {
  filterText: string;
  onFilterTextChange: (value: string) => void;
}

export const SearchInput = ({
  filterText,
  onFilterTextChange,
}: SearchInputProps) => {
  return (
    <div className="mb-4 max-w-sm">
      <Input
        type="search"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
    </div>
  );
};
