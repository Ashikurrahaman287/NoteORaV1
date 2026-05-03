import { useUser } from "@clerk/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { Moon, Sun, User, Shield } from "lucide-react";

export default function Settings() {
  const { user, isLoaded } = useUser();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleTheme = (checked: boolean) => {
    setIsDark(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-4 w-4" /> Profile
          </CardTitle>
          <CardDescription>Your account information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isLoaded ? (
            <div className="space-y-2">
              <div className="h-4 w-48 bg-secondary rounded animate-pulse" />
              <div className="h-4 w-64 bg-secondary rounded animate-pulse" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold">
                  {user?.firstName?.[0] ?? "U"}
                </div>
                <div>
                  <p className="font-semibold text-lg" data-testid="text-username">{user?.fullName ?? "User"}</p>
                  <p className="text-sm text-muted-foreground" data-testid="text-email">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Member since</span>
                  <p className="font-medium">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "—"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Account ID</span>
                  <p className="font-mono text-xs truncate">{user?.id?.slice(0, 20)}...</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />} Appearance
          </CardTitle>
          <CardDescription>Customize how Noteora looks for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Switch between light and dark theme.</p>
            </div>
            <Switch checked={isDark} onCheckedChange={toggleTheme} data-testid="switch-dark-mode" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4" /> Security
          </CardTitle>
          <CardDescription>Manage your security preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Password</p>
              <p className="text-sm text-muted-foreground">Managed through your authentication provider.</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Connected accounts</p>
              <p className="text-sm text-muted-foreground">
                {user?.externalAccounts?.length ? `${user.externalAccounts.length} account connected` : "No external accounts connected"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
