import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactFlow, { Edge, Node, useEdgesState, useNodesState } from 'reactflow';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Bot,
  Plus,
  Settings,
  Package,
  MessageCircle,
  Code2,
  Database,
  TestTube2,
  Rocket,
  Save
} from 'lucide-react';
import 'reactflow/dist/style.css';

type BotComponent = {
  id: string;
  type: 'trigger' | 'message' | 'api' | 'logic' | 'database' | 'output';
  name: string;
  description: string;
  icon: JSX.Element;
  config?: any;
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const componentTypes: BotComponent[] = [
  {
    id: 'Whatsapp',
    type: 'trigger',
    name: 'WhatsApp Trigger',
    description: 'Memulai percakapan dari pesan WhatsApp',
    icon: <MessageCircle className="h-5 w-5 text-green-500" />
  },
  {
    id: 'api-connector',
    type: 'api',
    name: 'API Integration',
    description: 'Hubungkan dengan API eksternal',
    icon: <Code2 className="h-5 w-5 text-blue-500" />
  },
  {
    id: 'message-builder',
    type: 'message',
    name: 'Message Builder',
    description: 'Bangun respons pesan dinamis',
    icon: <MessageCircle className="h-5 w-5 text-purple-500" />
  },
  {
    id: 'logic-gate',
    type: 'logic',
    name: 'Logic Gate',
    description: 'Tambahkan logika percabangan',
    icon: <Settings className="h-5 w-5 text-orange-500" />
  },
  {
    id: 'database-query',
    type: 'database',
    name: 'Database Query',
    description: 'Akses data dari database',
    icon: <Database className="h-5 w-5 text-red-500" />
  }
];

const Canvas = () => {
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedComponent, setSelectedComponent] = useState<BotComponent | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(true);
  const [botConfig, setBotConfig] = useState({
    name: '',
    description: '',
    platform: 'whatsapp',
    apiKey: ''
  });

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      const component = componentTypes.find(
        (c) => c.id === event.dataTransfer.getData('application/reactflow')
      );

      if (component) {
        const position = {
          x: event.clientX - 300,
          y: event.clientY - 100
        };

        const newNode = {
          id: `${component.id}-${Date.now()}`,
          type: 'custom',
          position,
          data: {
            label: component.name,
            ...component
          }
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [setNodes]
  );

  const handleCreateBot = () => {
    console.log('Bot configuration:', {
      ...botConfig,
      workflow: { nodes, edges }
    });
    setIsCreateModalOpen(false);
  };

  return (
    <DashboardLayout title="Bot Builder">
      <div className="flex h-screen">
        {/* Left Sidebar - Components */}
        <div className="w-72 border-r p-4 bg-muted/40">
          <h3 className="text-lg font-semibold mb-4">Komponen Bot</h3>
          <div className="space-y-2">
            {componentTypes.map((component) => (
              <div
                key={component.id}
                className="p-3 rounded-lg border bg-card hover:bg-accent cursor-grab"
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData('application/reactflow', component.id);
                  event.dataTransfer.effectAllowed = 'move';
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-background">
                    {component.icon}
                  </div>
                  <div>
                    <p className="font-medium">{component.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {component.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            fitView
            className="bg-muted/20"
          >
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <Button variant="outline" className="gap-2">
                <Save className="h-4 w-4" />
                Simpan Draft
              </Button>
              <Button variant="outline" className="gap-2">
                <TestTube2 className="h-4 w-4" />
                Test Bot
              </Button>
              <Button className="gap-2 bg-botnexa-500 hover:bg-botnexa-600">
                <Rocket className="h-4 w-4" />
                Publish
              </Button>
            </div>
          </ReactFlow>
        </div>

        {/* Right Sidebar - Configuration */}
        {selectedComponent && (
          <div className="w-96 border-l p-4 bg-muted/40">
            <h3 className="text-lg font-semibold mb-4">
              Konfigurasi {selectedComponent.name}
            </h3>

            {selectedComponent.type === 'api' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">API Endpoint</label>
                  <Input placeholder="https://api.example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Method</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Headers</label>
                  <Input placeholder="Authorization: Bearer ..." />
                </div>
              </div>
            )}

            {selectedComponent.type === 'message' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Template Pesan</label>
                  <Input placeholder="Halo {{nama}}, ..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Variabel</label>
                  <Input placeholder="nama, email, tanggal" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Initial Setup Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buat Bot Baru</DialogTitle>
            <DialogDescription>
              Konfigurasi dasar untuk bot Anda
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Bot</label>
              <Input
                value={botConfig.name}
                onChange={(e) => setBotConfig({ ...botConfig, name: e.target.value })}
                placeholder="Customer Support Bot"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Platform</label>
              <Select
                value={botConfig.platform}
                onValueChange={(value) => setBotConfig({ ...botConfig, platform: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">API Key</label>
              <Input
                value={botConfig.apiKey}
                onChange={(e) => setBotConfig({ ...botConfig, apiKey: e.target.value })}
                placeholder="Masukkan API key Anda"
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              className="w-full bg-botnexa-500 hover:bg-botnexa-600"
              onClick={handleCreateBot}
            >
              <Rocket className="mr-2 h-4 w-4" />
              Mulai Bangun Bot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Canvas;