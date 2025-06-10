
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

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
  const [details, setDetails] = useState("");

  const feedbackOptions = [
    { value: "location_incorrect", label: "Location incorrect" },
    { value: "info_incorrect", label: "Info incorrect" },
    { value: "other", label: "Other:[]" }
  ];

  const handleSubmit = () => {
    if (selectedType) {
      onSubmit({
        type: selectedType,
        details: selectedType === "other" && details.trim() ? details.trim() : undefined
      });
      // Reset form
      setSelectedType("");
      setDetails("");
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form when closing
    setSelectedType("");
    setDetails("");
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
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          
          {selectedType === "other" && (
            <div className="space-y-2">
              <Label htmlFor="details">Please describe the issue:</Label>
              <Textarea
                id="details"
                placeholder="Please provide more details about the issue..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="min-h-[80px]"
                disabled={isSubmitting}
              />
            </div>
          )}
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
