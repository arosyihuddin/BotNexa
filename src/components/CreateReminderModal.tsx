
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Contact, Reminder } from "@/types/app-types";

interface CreateReminderModalProps {
  onCreateReminder: (reminder: Partial<Reminder>) => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  contacts: Contact[];
}

const CreateReminderModal = ({ 
  onCreateReminder, 
  open, 
  onOpenChange, 
  contacts 
}: CreateReminderModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [contactId, setContactId] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !date || !time || !contactId) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Get contact name from ID
    const selectedContact = contacts.find(contact => contact.id === contactId);
    
    const newReminder: Partial<Reminder> = {
      title,
      description,
      dueDate: date ? new Date(
        date.getFullYear(), 
        date.getMonth(), 
        date.getDate(),
        parseInt(time.split(':')[0]),
        parseInt(time.split(':')[1])
      ).toISOString() : "",
      contactId,
      contactName: selectedContact?.name || "",
      priority,
      completed: false
    };
    
    onCreateReminder(newReminder);
    toast({
      title: "Reminder created",
      description: "Your reminder has been created successfully",
    });
    
    // Reset form and close modal
    setTitle("");
    setDescription("");
    setDate(undefined);
    setTime("");
    setPriority("medium");
    setContactId("");
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Reminder</DialogTitle>
          <DialogDescription>
            Set up a new reminder with date and time.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Reminder title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add details about your reminder"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                type="button"
                variant={priority === "low" ? "default" : "outline"}
                className={priority === "low" ? "bg-green-500 hover:bg-green-600" : ""}
                onClick={() => setPriority("low")}
              >
                Low
              </Button>
              <Button 
                type="button"
                variant={priority === "medium" ? "default" : "outline"}
                className={priority === "medium" ? "bg-amber-500 hover:bg-amber-600" : ""}
                onClick={() => setPriority("medium")}
              >
                Medium
              </Button>
              <Button 
                type="button"
                variant={priority === "high" ? "default" : "outline"}
                className={priority === "high" ? "bg-red-500 hover:bg-red-600" : ""}
                onClick={() => setPriority("high")}
              >
                High
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact">Contact</Label>
            <select 
              id="contact"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={contactId}
              onChange={(e) => setContactId(e.target.value)}
              required
            >
              <option value="">Select a contact</option>
              {contacts.map(contact => (
                <option key={contact.id} value={contact.id}>
                  {contact.name}
                </option>
              ))}
            </select>
          </div>
          
          <DialogFooter>
            <Button type="submit">Create Reminder</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReminderModal;
