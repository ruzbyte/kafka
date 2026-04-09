"use client";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/hooks/auth_hook";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Icon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Calendar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Settings />
      </div>
    </>
  );
}

function Settings() {
  const [alarmTime, setAlarmTime] = useState("15");
  const [alarmsEnabled, setAlarmsEnabled] = useState(true);
  const [multiAlarmEnabled, setMultiAlarmEnabled] = useState(false);
  const [multiAlerts, setMultiAlerts] = useState<string[]>([]);

  const { user } = useAuthStore();

  const addToMultiAlerts = (time: string) => {
    if (multiAlerts.includes(time)) return;
    setMultiAlerts((prev) => [...prev, time]);
  };

  const onSaveChanges = async () => {
    if (!user) return;
    const settings = {
      alarmsEnabled: alarmsEnabled,
      multiAlarmEnabled: multiAlarmEnabled,
      alarmTime: parseInt(alarmTime),
      multiAlerts: multiAlerts.map((time) => parseInt(time)),
    };

    try {
      await updateDoc(doc(db, "users", user.uid), settings);

      toast.success("Einstellungen gespeichert");
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Fehler beim Speichern der Einstellungen");
    }
  };

  useEffect(() => {
    if (!alarmsEnabled) {
      setMultiAlarmEnabled(false);
      setMultiAlerts([]);
    }
  }, [alarmsEnabled]);

  useEffect(() => {
    if (!user) return;
    if (user) {
      setAlarmsEnabled(user.alarmsEnabled ?? false);
      setMultiAlarmEnabled(user.multiAlarmEnabled ?? false);
      setAlarmTime(user.alarmTime ? user.alarmTime.toString() : "15");
      setMultiAlerts(
        user.multiAlerts ? user.multiAlerts.map((time) => time.toString()) : [],
      );
    }
  }, [user]);

  return (
    <div>
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Einstellungen</h1>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Kalender</h2>
          <p>Einstellungen für Alarme</p>
          <div>
            <Switch
              id="enable-alarms"
              checked={alarmsEnabled}
              onCheckedChange={setAlarmsEnabled}
            />
            <label htmlFor="enable-alarms" className="ml-2">
              Alarme aktivieren
            </label>
          </div>
          <div>
            <Switch
              id="enable-multi-alarms"
              checked={multiAlarmEnabled}
              onCheckedChange={setMultiAlarmEnabled}
              disabled={!alarmsEnabled}
            />
            <label htmlFor="enable-multi-alarms" className="ml-2">
              Mehrere Alarme aktivieren
            </label>
          </div>
          {multiAlarmEnabled && (
            <Card className="bg-muted">
              <CardHeader>
                <h3 className="text-md font-semibold">
                  Ausgewählte Alarmzeiten
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-row gap-2">
                  {multiAlerts.map((time, index) => (
                    <Badge asChild key={index}>
                      <Button
                        variant={"ghost"}
                        size={"sm"}
                        onClick={() =>
                          setMultiAlerts((prev) =>
                            prev.filter((t) => t !== time),
                          )
                        }
                      >
                        <X className="mr-1" size={12} />
                        {time} Minuten vorher
                      </Button>
                    </Badge>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setMultiAlerts([])}>
                  Alle entfernen
                </Button>
              </CardFooter>
            </Card>
          )}
          <Select
            value={alarmTime}
            onValueChange={(value) => {
              setAlarmTime(value);
              if (multiAlarmEnabled) addToMultiAlerts(value);
            }}
            disabled={!alarmsEnabled}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Alarmzeit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="15">15 Minuten vorher</SelectItem>
                <SelectItem value="30">30 Minuten vorher</SelectItem>
                <SelectItem value="60">1 Stunde vorher</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <Button onClick={onSaveChanges} variant="outline">
            Änderungen speichern
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
