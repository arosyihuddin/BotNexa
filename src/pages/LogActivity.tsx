
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Filter, 
  SearchIcon, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  PhoneOutgoing, 
  MessagesSquare, 
  Database, 
  Server,
  User
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import { dummyActivityLogs } from "@/lib/dummy-data";
import { ActivityLog } from "@/types/app-types";

const LogActivity = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  const logData = dummyActivityLogs;
  
  // Apply filters to log data
  const filteredLogs = logData.filter(log => {
    // Apply search term
    const matchesSearch = 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.contactName && log.contactName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.botName && log.botName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Apply action filter (as status)
    const matchesStatus = statusFilter === "all" || log.action.includes(statusFilter);
    
    // Apply type filter (based on whether it's a bot or contact action)
    let matchesType = true;
    if (typeFilter === "whatsapp") {
      matchesType = log.action.includes('message') || log.action.includes('conversation');
    } else if (typeFilter === "api") {
      matchesType = log.action.includes('bot_configured');
    } else if (typeFilter === "system") {
      matchesType = log.action.includes('reminder');
    }
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Function to render status badge with appropriate color
  const renderStatusBadge = (log: ActivityLog) => {
    if (log.action.includes('message_sent') || log.action.includes('conversation_started')) {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Success
        </Badge>
      );
    } else if (log.action.includes('error')) {
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="h-3 w-3 mr-1" />
          Error
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <AlertCircle className="h-3 w-3 mr-1" />
          Info
        </Badge>
      );
    }
  };
  
  // Function to render type icon
  const renderTypeIcon = (log: ActivityLog) => {
    if (log.action.includes('message') || log.action.includes('conversation')) {
      return <MessagesSquare className="h-4 w-4 text-green-600" />;
    } else if (log.action.includes('bot')) {
      return <Server className="h-4 w-4 text-blue-600" />;
    } else {
      return <Database className="h-4 w-4 text-purple-600" />;
    }
  };
  
  // Function to render mobile card for each log entry
  const renderMobileCard = (log: ActivityLog) => (
    <Card key={log.id} className="mb-3">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            {renderTypeIcon(log)}
            <div>
              <h4 className="font-medium">{log.action.replace(/_/g, ' ')}</h4>
              <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p>
            </div>
          </div>
          {renderStatusBadge(log)}
        </div>
        <p className="text-sm mb-2">{log.description}</p>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>
            {log.contactName ? `Contact: ${log.contactName}` : ''}
            {log.botName ? `Bot: ${log.botName}` : ''}
          </span>
          <span>ID: {log.id}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout title="Log Activity">
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>System Activity Logs</CardTitle>
                <CardDescription>
                  Monitor all WhatsApp and API integration activities
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative w-full md:w-96">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="w-40">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="message">Messages</SelectItem>
                      <SelectItem value="conversation">Conversations</SelectItem>
                      <SelectItem value="bot">Bot Actions</SelectItem>
                      <SelectItem value="reminder">Reminders</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-40">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {isMobile ? (
              // Mobile view - cards
              <div className="space-y-3">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map(renderMobileCard)
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No logs found matching your filters</p>
                  </div>
                )}
              </div>
            ) : (
              // Desktop view - table
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">ID</TableHead>
                      <TableHead className="w-[180px]">Timestamp</TableHead>
                      <TableHead className="w-[150px]">Action</TableHead>
                      <TableHead className="w-[120px]">Status</TableHead>
                      <TableHead className="w-[120px]">Contact/Bot</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono">{log.id}</TableCell>
                          <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                          <TableCell className="capitalize">{log.action.replace(/_/g, ' ')}</TableCell>
                          <TableCell>{renderStatusBadge(log)}</TableCell>
                          <TableCell>
                            {log.contactName && (
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {log.contactName}
                              </span>
                            )}
                            {log.botName && (
                              <span className="flex items-center gap-1">
                                <Server className="h-3 w-3" />
                                {log.botName}
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{log.description}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No logs found matching your filters
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LogActivity;
