"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function SearchButton() {
  const [query, setQuery] = useState("");

  return (
    <Dialog>
      {/* Button to open modal */}
      <DialogTrigger asChild>
        <buton className="search-btn">
          <SearchIcon size={18} />
        </buton>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="max-w-md border-2 border-black">
        <DialogHeader>
          <DialogTitle>Search For Reviews</DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <Input
          type="text"
          placeholder="Type to search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </DialogContent>
    </Dialog>
  );
}
