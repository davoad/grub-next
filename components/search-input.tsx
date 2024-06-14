import { Input } from "@/components/ui/input";

export interface SearchInputProps {
  filterText: string;
  onFilterTextChange: (value: string) => void;
  className?: string;
}

export const SearchInput = ({
  filterText,
  onFilterTextChange,
  className,
}: SearchInputProps) => {
  return (
    <div>
      <Input
        className={className}
        type="search"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
    </div>
  );
};
