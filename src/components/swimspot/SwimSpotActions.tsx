
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
        className={`rounded-full ${
          isSaved ? "text-swimspot-burnt-coral border-swimspot-burnt-coral" : "text-swimspot-blue-green border-swimspot-blue-green"
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
        className="rounded-full text-swimspot-blue-green border-swimspot-blue-green"
      >
        <Plus className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full text-swimspot-blue-green border-swimspot-blue-green"
      >
        <Share className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onReport}
        className="rounded-full text-swimspot-blue-green border-swimspot-blue-green"
      >
        <AlertTriangle className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default SwimSpotActions;
