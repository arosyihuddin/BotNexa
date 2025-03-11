
import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  User, 
  Lock, 
  Bell, 
  Globe, 
  CreditCard, 
  HelpCircle, 
  Shield,
  ChevronRight,
  Check,
  Copy,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DashboardLayout from "@/components/DashboardLayout";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <DashboardLayout title="Settings">
      <div className="space-y-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="profile" className="data-[state=active]:bg-botnexa-50 data-[state=active]:text-botnexa-700">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-botnexa-50 data-[state=active]:text-botnexa-700">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-botnexa-50 data-[state=active]:text-botnexa-700">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-botnexa-50 data-[state=active]:text-botnexa-700">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-botnexa-50 data-[state=active]:text-botnexa-700">
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>
          
          {/* Profile */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="font-medium">Profile Photo</h3>
                    <p className="text-sm text-muted-foreground">
                      Your photo will be used on your profile and in comments.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Change Photo</Button>
                      <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" defaultValue="Product Manager at BotNexa" />
                  <p className="text-xs text-muted-foreground">
                    Brief description for your profile.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-botnexa-500 hover:bg-botnexa-600">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Account */}
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-start border-botnexa-200 bg-botnexa-50">
                      <Check className="mr-2 h-4 w-4" />
                      English
                    </Button>
                    <Button variant="outline" className="justify-start">Spanish</Button>
                    <Button variant="outline" className="justify-start">French</Button>
                    <Button variant="outline" className="justify-start">German</Button>
                    <Button variant="outline" className="justify-start">Japanese</Button>
                    <Button variant="outline" className="justify-start">Chinese</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" value="(UTC-05:00) Eastern Time (US & Canada)" readOnly />
                  <p className="text-xs text-muted-foreground">
                    Your timezone is detected automatically based on your current location.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Date & Time Format</h3>
                  <RadioGroup defaultValue="12h" className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="12h" id="12h" />
                      <Label htmlFor="12h">12-hour (09:15 PM)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="24h" id="24h" />
                      <Label htmlFor="24h">24-hour (21:15)</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoSave">Auto-save drafts</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically save message drafts
                      </p>
                    </div>
                    <Switch id="autoSave" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-botnexa-500 hover:bg-botnexa-600">
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all of its data. This action cannot be undone.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="destructive">
                  Delete Account
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Message Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newMessage">New Messages</Label>
                        <p className="text-xs text-muted-foreground">
                          Get notified when you receive new messages
                        </p>
                      </div>
                      <Switch id="newMessage" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="mentions">Mentions</Label>
                        <p className="text-xs text-muted-foreground">
                          Get notified when you are mentioned
                        </p>
                      </div>
                      <Switch id="mentions" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="messageReplies">Message Replies</Label>
                        <p className="text-xs text-muted-foreground">
                          Get notified when someone replies to your message
                        </p>
                      </div>
                      <Switch id="messageReplies" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">System Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="updates">Product Updates</Label>
                        <p className="text-xs text-muted-foreground">
                          Get notified about new features and updates
                        </p>
                      </div>
                      <Switch id="updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="tips">Tips & Tutorials</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive tips on getting the most out of BotNexa
                        </p>
                      </div>
                      <Switch id="tips" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="security">Security Alerts</Label>
                        <p className="text-xs text-muted-foreground">
                          Get important security alerts and notifications
                        </p>
                      </div>
                      <Switch id="security" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Digests</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="weekly">Weekly Summary</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive a weekly summary of your bot's activity
                        </p>
                      </div>
                      <Switch id="weekly" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing">Marketing Updates</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive marketing communications and special offers
                        </p>
                      </div>
                      <Switch id="marketing" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-botnexa-500 hover:bg-botnexa-600">
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Security */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Change Password</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                      <p className="text-xs text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">Setup 2FA</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">API Keys</h3>
                  <p className="text-xs text-muted-foreground">
                    Manage your API keys for accessing BotNexa programmatically
                  </p>
                  
                  <div className="mt-3 space-y-3">
                    <div className="rounded-md border p-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="font-medium">Primary API Key</h4>
                          <div className="mt-1 flex items-center">
                            <div className="font-mono text-sm bg-muted px-2 py-1 rounded">
                              ••••••••••••••••••••1234
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Regenerate</Button>
                          <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="font-medium">Development API Key</h4>
                          <div className="mt-1 flex items-center">
                            <div className="font-mono text-sm bg-muted px-2 py-1 rounded">
                              ••••••••••••••••••••5678
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Regenerate</Button>
                          <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New API Key
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-botnexa-500 hover:bg-botnexa-600">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
                <CardDescription>
                  Manage active sessions on your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-1.5 rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Chrome on Windows</h4>
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">Current session</span> · Started 2 hours ago
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Safari on iPhone</h4>
                          <div className="text-xs text-muted-foreground">
                            Last active 1 day ago · New York, USA
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Firefox on MacOS</h4>
                          <div className="text-xs text-muted-foreground">
                            Last active 5 days ago · San Francisco, USA
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10 w-full">
                  Sign Out From All Devices
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Billing */}
          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Manage your subscription and billing details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Pro Plan</h3>
                      <p className="text-sm text-muted-foreground">
                        $29/month · Renews on June 15, 2023
                      </p>
                      <div className="mt-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                        Active
                      </div>
                    </div>
                    <Button variant="outline">Manage Subscription</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Payment Method</h3>
                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-md bg-muted p-2">
                          <CreditCard className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-xs text-muted-foreground">
                            Expires 04/24
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Billing Address</h3>
                  <div className="rounded-md border p-3">
                    <div className="space-y-1">
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm">123 Main St, Apt 4B</p>
                      <p className="text-sm">New York, NY 10001</p>
                      <p className="text-sm">United States</p>
                    </div>
                    <Button variant="link" className="px-0 h-8 mt-1 text-sm">
                      Edit address
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Billing History</h3>
                  <div className="rounded-md border">
                    <div className="p-3 border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Pro Plan - Monthly</p>
                          <p className="text-xs text-muted-foreground">
                            May 15, 2023
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$29.00</p>
                          <Button variant="link" className="h-6 p-0 text-xs">
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Pro Plan - Monthly</p>
                          <p className="text-xs text-muted-foreground">
                            April 15, 2023
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$29.00</p>
                          <Button variant="link" className="h-6 p-0 text-xs">
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Pro Plan - Monthly</p>
                          <p className="text-xs text-muted-foreground">
                            March 15, 2023
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$29.00</p>
                          <Button variant="link" className="h-6 p-0 text-xs">
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
