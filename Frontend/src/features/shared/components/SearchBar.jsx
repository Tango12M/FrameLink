import { Search } from "lucide-react";

const SearchBar = ({ searchLabel, setIsCmdOpen }) => {
  return (
    <div
      className="hidden md:flex relative group cursor-pointer"
      onClick={setIsCmdOpen}
    >
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
      <div className="w-64 bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-full py-2 pl-10 pr-4 flex items-center justify-between transition-colors group-hover:border-neutral-300 dark:group-hover:border-neutral-700">
        <span className="text-sm text-neutral-400">{searchLabel}</span>
        <span className="text-[10px] font-medium text-neutral-400 bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 rounded">
          ⌘ K
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
