
import { Button } from "@/components/ui/button";
import { Bookmark, Plus, Share, AlertTriangle } from "lucide-react";

interface SwimSpotActionsProps {
  isSaved: boolean | undefined;
  onSave: () => void;
  onMarkVisited: () => void;
  onReport: () => void;
  saveMutationPending: boolean;
  visitMutationPending: boolean;
}

const SwimSpotActions = ({
  isSaved,
  onSave,
  onMarkVisited,
  onReport,
  saveMutationPending,
  visitMutationPending
}: SwimSpotActionsProps) => {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={onSave}
        disabled={saveMutationPending}
        className={`rounded-full border-white bg-black/20 backdrop-blur-sm ${
          isSaved ? "text-swimspot-burnt-coral" : "text-white"
        }`}
      >
        <Bookmark
          className="h-5 w-5"
          fill={isSaved ? "currentColor" : "none"}
        />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onMarkVisited}
        disabled={visitMutationPending}
        className="rounded-full border-white bg-black/20 backdrop-blur-sm text-white"
      >
        <Plus className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full border-white bg-black/20 backdrop-blur-sm text-white"
      >
        <Share className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onReport}
        className="rounded-full border-white bg-black/20 backdrop-blur-sm text-white"
      >
        <AlertTriangle className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default SwimSpotActions;
