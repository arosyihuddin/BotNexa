
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
  Server 
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample log activity data
const logData = [
  {
    id: "001",
    timestamp: "2023-06-23 14:32:45",
    type: "whatsapp",
    action: "message_sent",
    status: "success",
    user: "John Doe",
    details: "Message sent to +1234567890",
  },
  {
    id: "002",
    timestamp: "2023-06-23 14:30:12",
    type: "api",
    action: "api_call",
    status: "error",
    user: "System",
    details: "API endpoint /data/fetch failed with 500 error",
  },
  {
    id: "003",
    timestamp: "2023-06-23 14:15:33",
    type: "whatsapp",
    action: "call_initiated",
    status: "success",
    user: "Sarah Williams",
    details: "Call initiated to +1987654321",
  },
  {
    id: "004",
    timestamp: "2023-06-23 13:45:08",
    type: "system",
    action: "system_update",
    status: "warning",
    user: "System",
    details: "Daily backup process completed with warnings",
  },
  {
    id: "005",
    timestamp: "2023-06-23 13:22:59",
    type: "api",
    action: "data_sync",
    status: "success",
    user: "System",
    details: "CRM data synchronized successfully",
  },
  {
    id: "006",
    timestamp: "2023-06-23 12:18:27",
    type: "whatsapp",
    action: "message_received",
    status: "success",
    user: "Alex Morgan",
    details: "New message received from +1122334455",
  },
  {
    id: "007",
    timestamp: "2023-06-23 11:42:15",
    type: "api",
    action: "webhook_trigger",
    status: "error",
    user: "System",
    details: "Webhook delivery to customer endpoint failed",
  },
  {
    id: "008",
    timestamp: "2023-06-23 10:55:33",
    type: "system",
    action: "user_login",
    status: "success",
    user: "Admin",
    details: "Administrator logged in from 192.168.1.105",
  },
];

const LogActivity = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  // Apply filters to log data
  const filteredLogs = logData.filter(log => {
    // Apply search term
    const matchesSearch = 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    
    // Apply type filter
    const matchesType = typeFilter === "all" || log.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Function to render status badge with appropriate color
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Success
          </Badge>
        );
      case "error":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        );
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Warning
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };
  
  // Function to render type icon
  const renderTypeIcon = (type: string) => {
    switch (type) {
      case "whatsapp":
        return <MessagesSquare className="h-4 w-4 text-green-600" />;
      case "api":
        return <Server className="h-4 w-4 text-blue-600" />;
      case "system":
        return <Database className="h-4 w-4 text-purple-600" />;
      default:
        return null;
    }
  };
  
  // Function to render mobile card for each log entry
  const renderMobileCard = (log: typeof logData[0]) => (
    <Card key={log.id} className="mb-3">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            {renderTypeIcon(log.type)}
            <div>
              <h4 className="font-medium">{log.action.replace('_', ' ')}</h4>
              <p className="text-xs text-muted-foreground">{log.timestamp}</p>
            </div>
          </div>
          {renderStatusBadge(log.status)}
        </div>
        <p className="text-sm mb-2">{log.details}</p>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>User: {log.user}</span>
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
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
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
                      <TableHead className="w-[100px]">Type</TableHead>
                      <TableHead className="w-[150px]">Action</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="w-[120px]">User</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono">{log.id}</TableCell>
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {renderTypeIcon(log.type)}
                              <span className="capitalize">{log.type}</span>
                            </div>
                          </TableCell>
                          <TableCell className="capitalize">{log.action.replace('_', ' ')}</TableCell>
                          <TableCell>{renderStatusBadge(log.status)}</TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
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
