import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  Award, 
  Upload, 
  Settings,
  Activity,
  BarChart3,
  Trophy,
  Calendar,
  Download
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Member } from "@/components/MemberCard";

const MOCK_MEMBERS: Member[] = [
  {
    id: "1",
    name: "Sarah Chen",
    credentials: "FCIArb",
    role: "Commercial Arbitrator",
    company: "Chen Dispute Resolution",
    country: "Singapore",
    primaryBranch: "Singapore Branch",
    category: "Staff",
    email: "s.chen@ciarb-branch.org",
    phone: "+65-555-0101",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    joinDate: "2020-03-15",
    status: "Active",
    cpdPoints: { "2024": 147, "2025": 98 },
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    credentials: "MCIArb",
    role: "Construction Arbitrator",
    company: "Rodriguez Legal Partners",
    country: "United Arab Emirates",
    primaryBranch: "Middle East Branch",
    category: "Board",
    email: "m.rodriguez@ciarb-branch.org",
    phone: "+971-555-0102",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    joinDate: "2019-01-10",
    status: "Active",
    cpdPoints: { "2024": 187, "2025": 125 },
  },
  {
    id: "3",
    name: "Priya Patel",
    credentials: "ACIArb",
    role: "International Commercial Lawyer",
    company: "Patel & Associates",
    country: "India",
    primaryBranch: "India Branch",
    category: "Staff",
    email: "p.patel@ciarb-branch.org",
    phone: "+91-555-0103",
    photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop",
    joinDate: "2021-06-20",
    status: "Active",
    cpdPoints: { "2024": 107, "2025": 71 },
  },
  {
    id: "4",
    name: "James Wilson",
    credentials: "MCIArb",
    role: "Maritime Arbitrator",
    company: "Wilson Maritime Disputes",
    country: "United Kingdom",
    primaryBranch: "London Branch",
    category: "Volunteer",
    email: "j.wilson@ciarb-branch.org",
    phone: "+44-555-0104",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    joinDate: "2022-02-14",
    status: "Active",
    cpdPoints: { "2024": 58, "2025": 38 },
  },
  {
    id: "5",
    name: "Elena Kowalski",
    credentials: "FCIArb",
    role: "Energy & Resources Arbitrator",
    company: "Kowalski Chambers",
    country: "Australia",
    primaryBranch: "Australia Branch",
    category: "Staff",
    email: "e.kowalski@ciarb-branch.org",
    phone: "+61-555-0105",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    joinDate: "2020-09-01",
    status: "Active",
    cpdPoints: { "2024": 121, "2025": 80 },
  },
  {
    id: "6",
    name: "David Okonkwo",
    credentials: "MCIArb",
    role: "Banking & Finance Arbitrator",
    company: "Okonkwo Legal Consult",
    country: "Nigeria",
    primaryBranch: "West Africa Branch",
    category: "Board",
    email: "d.okonkwo@ciarb-branch.org",
    phone: "+234-555-0106",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    joinDate: "2019-05-30",
    status: "Active",
    cpdPoints: { "2024": 172, "2025": 115 },
  },
  {
    id: "7",
    name: "Aisha Mohammed",
    credentials: "ACIArb",
    role: "Commercial Mediator",
    company: "Mohammed Mediation Services",
    country: "Kenya",
    primaryBranch: "East Africa Branch",
    category: "Volunteer",
    email: "a.mohammed@ciarb-branch.org",
    phone: "+254-555-0107",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    joinDate: "2023-01-12",
    status: "Active",
    cpdPoints: { "2024": 32, "2025": 22 },
  },
  {
    id: "8",
    name: "Robert Zhang",
    credentials: "FCIArb",
    role: "IP & Technology Arbitrator",
    company: "Zhang International Arbitration",
    country: "Hong Kong",
    primaryBranch: "Hong Kong Branch",
    category: "Board",
    email: "r.zhang@ciarb-branch.org",
    phone: "+852-555-0108",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    joinDate: "2018-11-22",
    status: "Active",
    cpdPoints: { "2024": 214, "2025": 142 },
  },
  {
    id: "9",
    name: "Linda Nguyen",
    credentials: "MCIArb",
    role: "Employment Disputes Specialist",
    company: "Nguyen ADR Solutions",
    country: "Canada",
    primaryBranch: "Canada Branch",
    category: "Staff",
    email: "l.nguyen@ciarb-branch.org",
    phone: "+1-555-0109",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    joinDate: "2021-03-08",
    status: "Active",
    cpdPoints: { "2024": 113, "2025": 76 },
  },
  {
    id: "10",
    name: "Carlos Mendez",
    credentials: "ACIArb",
    role: "Sports Arbitration Specialist",
    company: "Mendez Sports Law",
    country: "Spain",
    primaryBranch: "Europe Branch",
    category: "Volunteer",
    email: "c.mendez@ciarb-branch.org",
    phone: "+34-555-0110",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
    joinDate: "2022-08-19",
    status: "Active",
    cpdPoints: { "2024": 74, "2025": 49 },
  },
  {
    id: "11",
    name: "Fatima Al-Rashid",
    credentials: "FCIArb",
    role: "Islamic Finance Arbitrator",
    company: "Al-Rashid Chambers",
    country: "Saudi Arabia",
    primaryBranch: "Middle East Branch",
    category: "Staff",
    email: "f.alrashid@ciarb-branch.org",
    phone: "+966-555-0111",
    photoUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop",
    joinDate: "2020-07-15",
    status: "Active",
    cpdPoints: { "2024": 140, "2025": 94 },
  },
  {
    id: "12",
    name: "Thomas Anderson",
    credentials: "MCIArb",
    role: "International Trade Arbitrator",
    company: "Anderson Global Disputes",
    country: "United States",
    primaryBranch: "North America Branch",
    category: "Board",
    email: "t.anderson@ciarb-branch.org",
    phone: "+1-555-0112",
    photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop",
    joinDate: "2019-09-05",
    status: "Active",
    cpdPoints: { "2024": 179, "2025": 119 },
  },
];

export default function AdminDashboard() {
  const totalMembers = MOCK_MEMBERS.length;
  const activeMembers = MOCK_MEMBERS.filter((m) => m.status === "Active").length;
  const totalCPDPoints = MOCK_MEMBERS.reduce((sum, m) => {
    return sum + Object.values(m.cpdPoints).reduce((s, v) => s + v, 0);
  }, 0);
  const averageCPDPoints = Math.round(totalCPDPoints / totalMembers);

  const categoryBreakdown = {
    Staff: MOCK_MEMBERS.filter((m) => m.category === "Staff").length,
    Board: MOCK_MEMBERS.filter((m) => m.category === "Board").length,
    Volunteer: MOCK_MEMBERS.filter((m) => m.category === "Volunteer").length,
  };

  const topPerformers = [...MOCK_MEMBERS]
    .sort((a, b) => {
      const totalA = Object.values(a.cpdPoints).reduce((s, v) => s + v, 0);
      const totalB = Object.values(b.cpdPoints).reduce((s, v) => s + v, 0);
      return totalB - totalA;
    })
    .slice(0, 5);

  const exportFullDirectory = () => {
    const trackedYears = JSON.parse(localStorage.getItem("ciarb_tracked_years") || '["2024", "2025"]');
    const cpdHeaders = trackedYears.map((y: string) => `CPD_${y}`).join(",");
    
    let csv = `Name,Credentials,Role,Company,Country,Primary Branch,Category,Email,Phone,Status,Join Date,${cpdHeaders},Total CPD\n`;
    
    MOCK_MEMBERS.forEach((member) => {
      const cpdValues = trackedYears.map((y: string) => member.cpdPoints[y] || 0).join(",");
      const totalCPD = Object.values(member.cpdPoints).reduce((s, v) => s + v, 0);
      
      csv += `"${member.name}","${member.credentials}","${member.role}","${member.company}","${member.country}","${member.primaryBranch}","${member.category}","${member.email}","${member.phone}","${member.status}","${member.joinDate}",${cpdValues},${totalCPD}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `member-directory-full-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const exportCPDReport = () => {
    const trackedYears = JSON.parse(localStorage.getItem("ciarb_tracked_years") || '["2024", "2025"]');
    const cpdHeaders = trackedYears.map((y: string) => `CPD_${y}`).join(",");
    
    let csv = `Rank,Name,Credentials,Category,${cpdHeaders},Total CPD,Status\n`;
    
    const rankedMembers = [...MOCK_MEMBERS].sort((a, b) => {
      const totalA = Object.values(a.cpdPoints).reduce((s, v) => s + v, 0);
      const totalB = Object.values(b.cpdPoints).reduce((s, v) => s + v, 0);
      return totalB - totalA;
    });

    rankedMembers.forEach((member, index) => {
      const cpdValues = trackedYears.map((y: string) => member.cpdPoints[y] || 0).join(",");
      const totalCPD = Object.values(member.cpdPoints).reduce((s, v) => s + v, 0);
      
      csv += `${index + 1},"${member.name}","${member.credentials}","${member.category}",${cpdValues},${totalCPD},"${member.status}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cpd-report-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO
        title="Admin Dashboard | Member Directory"
        description="Admin dashboard for member management and statistics"
      />
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <header className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Settings className="w-8 h-8 text-primary" />
                <h1 className="font-mono font-bold text-3xl text-foreground">
                  ADMIN_DASHBOARD
                </h1>
              </div>
              <div className="flex gap-3">
                <Link href="/leaderboard">
                  <Button variant="outline" size="sm" className="font-sans">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Leaderboard
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" size="sm" className="font-sans">
                    <Users className="w-4 h-4 mr-2" />
                    Directory
                  </Button>
                </Link>
              </div>
            </div>
            <p className="font-mono text-sm text-muted-foreground">
              Member management and analytics overview
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    Total Members
                  </p>
                  <p className="font-mono font-bold text-2xl text-foreground tabular-nums">
                    {totalMembers}
                  </p>
                </div>
              </div>
              <p className="font-sans text-xs text-muted-foreground">
                {activeMembers} active
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    Avg CPD Points
                  </p>
                  <p className="font-mono font-bold text-2xl text-foreground tabular-nums">
                    {averageCPDPoints}
                  </p>
                </div>
              </div>
              <p className="font-sans text-xs text-muted-foreground">
                Per active member
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    Total CPD Points
                  </p>
                  <p className="font-mono font-bold text-2xl text-foreground tabular-nums">
                    {totalCPDPoints.toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="font-sans text-xs text-muted-foreground">
                Across all members
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    Categories
                  </p>
                  <p className="font-mono font-bold text-2xl text-foreground tabular-nums">
                    3
                  </p>
                </div>
              </div>
              <p className="font-sans text-xs text-muted-foreground">
                Staff, Board, Volunteer
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-accent" />
                  <h2 className="font-mono font-bold text-lg text-foreground">
                    TOP_PERFORMERS
                  </h2>
                </div>
                <Link href="/leaderboard">
                  <Button variant="ghost" size="sm" className="font-sans text-xs">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {topPerformers.map((member, index) => (
                  <Link
                    key={member.id}
                    href={`/members/${member.id}`}
                    className="block group"
                  >
                    <div className="flex items-center gap-4 p-3 rounded-sm hover:bg-muted/50 transition-colors">
                      <div className="w-8 h-8 flex items-center justify-center font-mono font-bold text-sm text-muted-foreground">
                        #{index + 1}
                      </div>
                      <div className="w-12 h-12 rounded-sm overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={member.photoUrl}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <p className="font-sans font-semibold text-sm text-foreground truncate group-hover:text-accent transition-colors">
                            {member.name}
                          </p>
                          <span className="font-sans font-semibold text-xs text-accent flex-shrink-0">
                            {member.credentials}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-muted-foreground truncate">
                          {member.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="font-mono text-xs">
                          {member.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-accent">
                          <Award className="w-4 h-4" />
                          <span className="font-mono font-bold text-sm tabular-nums">
                            {Object.values(member.cpdPoints).reduce((s, v) => s + v, 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="font-mono font-bold text-lg text-foreground">
                  CATEGORY_BREAKDOWN
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-foreground">Staff</span>
                    <span className="font-mono font-bold text-sm text-foreground tabular-nums">
                      {categoryBreakdown.Staff}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${(categoryBreakdown.Staff / totalMembers) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-foreground">Board</span>
                    <span className="font-mono font-bold text-sm text-foreground tabular-nums">
                      {categoryBreakdown.Board}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{
                        width: `${(categoryBreakdown.Board / totalMembers) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-foreground">Volunteer</span>
                    <span className="font-mono font-bold text-sm text-foreground tabular-nums">
                      {categoryBreakdown.Volunteer}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary/60 rounded-full"
                      style={{
                        width: `${(categoryBreakdown.Volunteer / totalMembers) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="font-mono font-bold text-lg text-foreground">
                QUICK_ACTIONS
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Link href="/admin/import" className="block">
                <Button className="w-full font-sans h-auto py-4 flex-col gap-2">
                  <Upload className="w-5 h-5" />
                  <span>Import Members</span>
                  <span className="text-xs font-normal opacity-70">CSV or XML</span>
                </Button>
              </Link>
              <Link href="/admin/cpd-settings" className="block">
                <Button className="w-full font-sans h-auto py-4 flex-col gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>CPD Years</span>
                  <span className="text-xs font-normal opacity-70">Manage tracking</span>
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full font-sans h-auto py-4 flex-col gap-2 bg-accent hover:bg-accent/90">
                    <Download className="w-5 h-5" />
                    <span>Export Data</span>
                    <span className="text-xs font-normal opacity-70">CSV Reports</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56">
                  <DropdownMenuItem onClick={exportFullDirectory} className="font-sans cursor-pointer">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Full Member Directory</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={exportCPDReport} className="font-sans cursor-pointer">
                    <Trophy className="mr-2 h-4 w-4" />
                    <span>CPD Points Report</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/" className="block">
                <Button
                  variant="outline"
                  className="w-full font-sans h-auto py-4 flex-col gap-2"
                >
                  <Users className="w-5 h-5" />
                  <span>View All Members</span>
                </Button>
              </Link>
              <Link href="/leaderboard" className="block">
                <Button
                  variant="outline"
                  className="w-full font-sans h-auto py-4 flex-col gap-2"
                >
                  <Trophy className="w-5 h-5" />
                  <span>CPD Leaderboard</span>
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}