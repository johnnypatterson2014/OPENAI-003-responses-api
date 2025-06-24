"use client";
import React, { useState } from "react";
import useToolsStore from "@/stores/useToolsStore";
import FileUpload from "./file-upload";
import { Input } from "./ui/input";
import { Plus, CircleX } from "lucide-react";
import { TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Tooltip } from "./ui/tooltip";
import { TooltipProvider } from "./ui/tooltip";

export default function FileSearchSetup() {
  const { vectorStore, setVectorStore } = useToolsStore();
  const [newStoreId, setNewStoreId] = useState<string>("");

  const unlinkStore = async () => {
    setVectorStore({
      id: "",
      name: "",
    });
  };

  const handleAddStore = async (storeId: string) => {
    if (storeId.trim()) {
      const newStore = await fetch(
        `/api/vector_stores/retrieve_store?vector_store_id=${storeId}`
      ).then((res) => res.json());
      if (newStore.id) {
        console.log("Retrieved store:", newStore);
        setVectorStore(newStore);
      } else {
        alert("Vector store not found");
      }
    }
  };

  return (
    <div>
      <div className="text-sm text-zinc-300">
        Upload a file to create a new vector store, or use an existing one.
      </div>
      <div className="flex items-center gap-2 mt-2 h-10">
        <div className="flex items-center gap-2 w-full">
          <div className="text-sm font-medium w-24 text-nowrap">
            Vector store
          </div>
          {vectorStore?.id ? (
            <div className="flex items-center justify-between flex-1 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <div className="text-zinc-400  text-xs font-mono flex-1 text-ellipsis truncate">
                  {vectorStore.id}
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleX
                        onClick={() => unlinkStore()}
                        size={16}
                        className="cursor-pointer text-zinc-400 mb-0.5 shrink-0 mt-0.5 hover:text-zinc-700 transition-all"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="mr-2">
                      <p>Unlink vector store</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="ID (vs_XXXX...)"
                value={newStoreId}
                onChange={(e) => setNewStoreId(e.target.value)}
                className="bg-zinc-900 border border-zinc-600 text-sm text-zinc-300"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddStore(newStoreId);
                  }
                }}
              />
              <div
                className="items-center btn btn-sm bg-zinc-800 hover:bg-zinc-100 border border-zinc-600 text-zinc-200 hover:text-zinc-900"
                onClick={() => handleAddStore(newStoreId)}
              >
                Add
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex mt-4">
        <FileUpload
          vectorStoreId={vectorStore?.id ?? ""}
          vectorStoreName={vectorStore?.name ?? ""}
          onAddStore={(id) => handleAddStore(id)}
          onUnlinkStore={() => unlinkStore()}
        />
      </div>
    </div>
  );
}
