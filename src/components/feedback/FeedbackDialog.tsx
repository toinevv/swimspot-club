
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (feedbackData: { type: string; details?: string }) => void;
  isSubmitting: boolean;
}

const FeedbackDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting
}: FeedbackDialogProps) => {
  const [selectedType, setSelectedType] = useState("");
  const [otherText, setOtherText] = useState("");

  const feedbackOptions = [
    { value: "location_incorrect", label: "Location incorrect" },
    { value: "info_incorrect", label: "Info incorrect" },
    { value: "other", label: "Other:" }
  ];

  const handleSubmit = () => {
    if (selectedType) {
      let feedbackDetails = undefined;
      
      if (selectedType === "other" && otherText.trim()) {
        feedbackDetails = otherText.trim();
      }
      
      onSubmit({
        type: selectedType,
        details: feedbackDetails
      });
      
      // Reset form
      setSelectedType("");
      setOtherText("");
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form when closing
    setSelectedType("");
    setOtherText("");
  };

  const handleOptionClick = (value: string) => {
    setSelectedType(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report an Issue</DialogTitle>
          <DialogDescription>
            Help us improve this swim spot by reporting any issues. Please select the type of issue you've encountered.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup value={selectedType} onValueChange={setSelectedType}>
            {feedbackOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <div 
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => handleOptionClick(option.value)}
                >
                  <RadioGroupItem 
                    value={option.value} 
                    id={option.value}
                    className={cn(
                      option.value === "other" && selectedType !== "other" && 
                      "border-swimspot-burnt-coral text-swimspot-burnt-coral hover:border-swimspot-burnt-coral/80"
                    )}
                  />
                  <Label htmlFor={option.value} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
                {option.value === "other" && (
                  <Input
                    placeholder="Please specify..."
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    className="ml-2 flex-1"
                    disabled={isSubmitting}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </div>
            ))}
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedType || isSubmitting}
            className="bg-swimspot-blue-green hover:bg-swimspot-blue-green/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
