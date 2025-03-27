
import { useState, useEffect } from "react";
import { Search, Plus, Check, Clock, User, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import CreateReminderModal from "@/components/CreateReminderModal";
import { dummyReminders, dummyContacts } from "@/lib/dummy-data";
import { RemindersService } from "@/services/reminders.service";
import { Reminder } from "@/types/app-types";

const Reminders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTab, setSelectedTab] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>(dummyReminders);

  // Filter reminders based on search, date and tab
  const filteredReminders = reminders.filter(reminder => {
    const matchesSearch = 
      reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      reminder.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reminder.contactName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const reminderDate = new Date(reminder.dueDate);
    const matchesDate = !selectedDate || 
      (reminderDate.getDate() === selectedDate.getDate() && 
       reminderDate.getMonth() === selectedDate.getMonth() && 
       reminderDate.getFullYear() === selectedDate.getFullYear());
    
    if (selectedTab === "all") return matchesSearch && matchesDate;
    if (selectedTab === "upcoming") return matchesSearch && matchesDate && !reminder.completed;
    if (selectedTab === "completed") return matchesSearch && matchesDate && reminder.completed;
    
    // Filter by priority
    return matchesSearch && matchesDate && reminder.priority === selectedTab;
  });

  const markAsCompleted = (reminderId: string) => {
    const updatedReminders = reminders.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, completed: true } 
        : reminder
    );
    setReminders(updatedReminders);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900";
      case "medium":
        return "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900";
      case "low":
        return "text-green-600 bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900";
      default:
        return "";
    }
  };

  // Function to group reminders by date
  const groupRemindersByDate = (reminders: Reminder[]) => {
    const grouped: Record<string, Reminder[]> = {};
    reminders.forEach(reminder => {
      const dateKey = format(new Date(reminder.dueDate), "yyyy-MM-dd");
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(reminder);
    });
    return grouped;
  };

  const groupedReminders = groupRemindersByDate(filteredReminders);
  const sortedDateKeys = Object.keys(groupedReminders).sort();
  
  const handleCreateReminder = (newReminder: Partial<Reminder>) => {
    const reminder = {
      ...newReminder,
      id: `temp-${Date.now()}`,
      completed: false
    } as Reminder;
    
    setReminders([...reminders, reminder]);
    setIsCreateModalOpen(false);
  };

  return (
    <DashboardLayout title="Reminders">
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Reminders & Tasks</h1>
          <Button 
            onClick={() => setIsCreateModalOpen(true)} 
            className="bg-botnexa-500 hover:bg-botnexa-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Reminder
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Sidebar with Calendar and Filters */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Select Date</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="border rounded-md"
                />
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setSelectedDate(new Date())}
                >
                  <User className="mr-2 h-4 w-4" />
                  Today
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Filter Reminders</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Tabs defaultValue="all" onValueChange={setSelectedTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  </TabsList>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="high" className="text-red-600">High</TabsTrigger>
                    <TabsTrigger value="medium" className="text-amber-600">Medium</TabsTrigger>
                    <TabsTrigger value="low" className="text-green-600">Low</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reminders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              
              <CardContent>
                {sortedDateKeys.length === 0 ? (
                  <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">No reminders found</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      {searchQuery 
                        ? `No reminders match your search "${searchQuery}"` 
                        : "You don't have any reminders for the selected period"}
                    </p>
                  </div>
                ) : (
                  sortedDateKeys.map(dateKey => (
                    <div key={dateKey} className="mb-6 last:mb-0">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {format(new Date(dateKey), "EEEE, MMMM d, yyyy")}
                      </h3>
                      
                      <div className="space-y-3">
                        {groupedReminders[dateKey].map(reminder => (
                          <div 
                            key={reminder.id}
                            className={`p-4 border rounded-lg flex items-start gap-3 hover:bg-accent/50 transition-colors ${
                              reminder.completed ? "bg-muted/50" : ""
                            }`}
                          >
                            <Button 
                              variant="outline"
                              size="icon"
                              className={`h-6 w-6 rounded-full shrink-0 ${
                                reminder.completed 
                                ? "bg-green-500 text-white border-green-500 hover:bg-green-600 hover:text-white" 
                                : ""
                              }`}
                              onClick={() => markAsCompleted(reminder.id)}
                            >
                              {reminder.completed && <Check className="h-3 w-3" />}
                            </Button>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <h4 className={`font-medium ${reminder.completed ? "line-through text-muted-foreground" : ""}`}>
                                  {reminder.title}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${getPriorityColor(reminder.priority)}`}
                                  >
                                    {reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1)} Priority
                                  </Badge>
                                  
                                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {format(new Date(reminder.dueDate), "h:mm a")}
                                  </Badge>
                                </div>
                              </div>
                              
                              <p className={`text-sm mt-1 ${reminder.completed ? "text-muted-foreground line-through" : "text-muted-foreground"}`}>
                                {reminder.description}
                              </p>
                              
                              <div className="flex items-center mt-2 text-xs">
                                <Badge variant="outline" className="text-xs bg-botnexa-50 text-botnexa-700 dark:bg-botnexa-950/20 dark:text-botnexa-400 border-botnexa-200 dark:border-botnexa-900 flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {reminder.contactName}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <CreateReminderModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen} 
        contacts={dummyContacts}
        onCreateReminder={handleCreateReminder}
      />
    </DashboardLayout>
  );
};

export default Reminders;
