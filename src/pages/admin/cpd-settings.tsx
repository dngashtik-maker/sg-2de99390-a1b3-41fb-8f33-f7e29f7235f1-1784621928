import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Calendar, Trash2, CheckCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const STORAGE_KEY = "ciarb_cpd_years";

export default function CPDSettings() {
  const [trackedYears, setTrackedYears] = useState<string[]>([]);
  const [newYear, setNewYear] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTrackedYears(JSON.parse(stored));
    } else {
      const defaultYears = ["2024", "2025"];
      setTrackedYears(defaultYears);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultYears));
    }
  }, []);

  const addYear = () => {
    setError("");
    setSuccess("");

    const yearNum = parseInt(newYear);
    if (!newYear || isNaN(yearNum)) {
      setError("Please enter a valid year");
      return;
    }

    if (yearNum < 2020 || yearNum > 2100) {
      setError("Year must be between 2020 and 2100");
      return;
    }

    if (trackedYears.includes(newYear)) {
      setError("This year is already being tracked");
      return;
    }

    const updated = [...trackedYears, newYear].sort();
    setTrackedYears(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setNewYear("");
    setSuccess(`Year ${newYear} added successfully`);
    setTimeout(() => setSuccess(""), 3000);
  };

  const removeYear = (year: string) => {
    const updated = trackedYears.filter((y) => y !== year);
    setTrackedYears(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSuccess(`Year ${year} removed`);
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <>
      <SEO
        title="CPD Year Settings | Admin Dashboard"
        description="Manage CPD tracking years"
      />
      <div className="min-h-screen bg-background">
        <div className="container py-8 max-w-4xl">
          <div className="mb-8">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm" className="mb-4 font-sans">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-8 h-8 text-primary" />
              <h1 className="font-sans font-bold text-3xl text-foreground">
                CPD Year Settings
              </h1>
            </div>
            <p className="font-sans text-sm text-muted-foreground">
              Manage which years are tracked for Continuing Professional Development points
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-accent/10 border border-accent rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="font-sans text-sm text-foreground">{success}</p>
            </div>
          )}

          <Card className="p-6 mb-6">
            <h2 className="font-sans font-bold text-lg text-foreground mb-4">
              Add New Year
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor="newYear" className="font-sans text-sm font-semibold mb-2 block">
                    Year
                  </Label>
                  <Input
                    id="newYear"
                    type="number"
                    placeholder="2026"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addYear()}
                    className="font-sans"
                    min="2020"
                    max="2100"
                  />
                </div>
                <div className="self-end">
                  <Button onClick={addYear} className="font-sans">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Year
                  </Button>
                </div>
              </div>
              {error && (
                <p className="text-sm text-destructive font-sans">{error}</p>
              )}
              <p className="text-xs text-muted-foreground font-sans">
                Adding a new year will create CPD tracking fields for that year across all member profiles and edit forms.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-sans font-bold text-lg text-foreground mb-4">
              Currently Tracked Years
            </h2>
            {trackedYears.length === 0 ? (
              <p className="font-sans text-sm text-muted-foreground">
                No years are currently being tracked. Add a year above to get started.
              </p>
            ) : (
              <div className="space-y-3">
                {trackedYears.map((year) => (
                  <div
                    key={year}
                    className="flex items-center justify-between p-4 border border-border rounded-lg bg-card"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-sans font-semibold text-base text-foreground">
                          {year}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground">
                          CPD Points tracked for this year
                        </p>
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="font-sans">Remove Year {year}?</AlertDialogTitle>
                          <AlertDialogDescription className="font-sans">
                            This will remove CPD tracking for {year}. Member data for this year will be lost unless you have a backup. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="font-sans">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => removeYear(year)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-sans"
                          >
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <div className="mt-6 p-4 bg-muted/50 border border-border rounded-lg">
            <h3 className="font-sans font-semibold text-sm text-foreground mb-2">
              How It Works
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-sans list-disc list-inside">
              <li>Add years to track CPD points separately for each year</li>
              <li>Member profiles will display all tracked years automatically</li>
              <li>Edit forms will include input fields for all tracked years</li>
              <li>Leaderboard calculates totals across all tracked years</li>
              <li>Import templates will reflect currently tracked years</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}