import { useState, useMemo } from "react";
import { Search, Users, TrendingUp, Settings } from "lucide-react";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { MemberCard, type Member } from "@/components/MemberCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  email: "s.chen@directory.org",
  phone: "+65-555-0101",
  photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  joinDate: "2020-03-15",
  status: "Active",
  cpdPoints: { "2024": 147, "2025": 98 }
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
  email: "m.rodriguez@directory.org",
  phone: "+971-555-0102",
  photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  joinDate: "2019-01-10",
  status: "Active",
  cpdPoints: { "2024": 187, "2025": 125 }
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
  email: "p.patel@directory.org",
  phone: "+91-555-0103",
  photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop",
  joinDate: "2021-06-20",
  status: "Active",
  cpdPoints: { "2024": 107, "2025": 71 }
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
  email: "j.wilson@directory.org",
  phone: "+44-555-0104",
  photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
  joinDate: "2022-02-14",
  status: "Active",
  cpdPoints: { "2024": 58, "2025": 38 }
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
  email: "e.kowalski@directory.org",
  phone: "+61-555-0105",
  photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  joinDate: "2020-09-01",
  status: "Active",
  cpdPoints: { "2024": 121, "2025": 80 }
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
  email: "d.okonkwo@directory.org",
  phone: "+234-555-0106",
  photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
  joinDate: "2019-05-30",
  status: "Active",
  cpdPoints: { "2024": 172, "2025": 115 }
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
  email: "a.mohammed@directory.org",
  phone: "+254-555-0107",
  photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
  joinDate: "2023-01-12",
  status: "Active",
  cpdPoints: { "2024": 32, "2025": 22 }
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
  email: "r.zhang@directory.org",
  phone: "+852-555-0108",
  photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
  joinDate: "2018-11-22",
  status: "Active",
  cpdPoints: { "2024": 214, "2025": 142 }
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
  email: "l.nguyen@directory.org",
  phone: "+1-555-0109",
  photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
  joinDate: "2021-03-08",
  status: "Active",
  cpdPoints: { "2024": 113, "2025": 76 }
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
  email: "c.mendez@directory.org",
  phone: "+34-555-0110",
  photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
  joinDate: "2022-08-19",
  status: "Active",
  cpdPoints: { "2024": 74, "2025": 49 }
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
  email: "f.alrashid@directory.org",
  phone: "+966-555-0111",
  photoUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop",
  joinDate: "2020-07-15",
  status: "Active",
  cpdPoints: { "2024": 140, "2025": 94 }
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
  email: "t.anderson@directory.org",
  phone: "+1-555-0112",
  photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop",
  joinDate: "2019-09-05",
  status: "Active",
  cpdPoints: { "2024": 179, "2025": 119 }
}];


const GRADES = ["All", "FCIArb", "MCIArb", "ACIArb"];
const COUNTRIES = ["All", ...Array.from(new Set(MOCK_MEMBERS.map((m) => m.country))).sort()];
const BRANCHES = ["All", ...Array.from(new Set(MOCK_MEMBERS.map((m) => m.primaryBranch))).sort()];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGrade, setActiveGrade] = useState("All");
  const [activeCountry, setActiveCountry] = useState("All");
  const [activeBranch, setActiveBranch] = useState("All");

  const filteredMembers = useMemo(() => {
    return MOCK_MEMBERS.filter((member) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
      searchQuery === "" ||
      member.name.toLowerCase().includes(searchLower) ||
      member.role.toLowerCase().includes(searchLower) ||
      member.company.toLowerCase().includes(searchLower);

      const matchesGrade = activeGrade === "All" || member.credentials === activeGrade;
      const matchesCountry = activeCountry === "All" || member.country === activeCountry;
      const matchesBranch = activeBranch === "All" || member.primaryBranch === activeBranch;

      return matchesSearch && matchesGrade && matchesCountry && matchesBranch;
    });
  }, [searchQuery, activeGrade, activeCountry, activeBranch]);

  const clearFilters = () => {
    setSearchQuery("");
    setActiveGrade("All");
    setActiveCountry("All");
    setActiveBranch("All");
  };

  return (
    <>
      <SEO
        title="Member Directory - CIArb Kenya Branch"
        description="Connect with qualified arbitrators, mediators, and ADR practitioners across Kenya and East Africa. Search our directory of CIArb members." />
      
      <div className="min-h-screen bg-background">
        <div className="relative bg-primary overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/generated/nairobi-skyline.png"
              alt="Nairobi skyline"
              className="w-full h-full object-cover opacity-30" />
            
            <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/80 to-primary"></div>
          </div>
          <div className="relative container py-16 md:py-20" style={{ backgroundColor: "transparent", backgroundImage: "none" }}>
            <div className="max-w-3xl">
              <h1 className="font-sans font-bold text-4xl md:text-5xl text-white mb-4">
                CIArb Kenya Branch Member Directory
              </h1>
              <p className="font-sans text-lg md:text-xl text-white/90 leading-relaxed mb-6">
                Connect with qualified arbitrators, mediators, and alternative dispute resolution practitioners across Kenya and the East African Community. Our directory features CIArb members committed to excellence in dispute resolution practice.
              </p>
              <div className="flex flex-wrap gap-6 text-sm font-sans text-white/80">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{MOCK_MEMBERS.length} Active Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>CPD Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <header className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <h2 className="font-sans font-bold text-2xl text-foreground">
                    Search Members
                  </h2>
                  <p className="font-sans text-sm text-muted-foreground mt-1">
                    Filter by grade, country, or branch
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link href="/admin/dashboard">
                  <Button variant="outline" size="sm" className="font-sans">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </Link>
                <Link href="/leaderboard">
                  <Button variant="outline" size="sm" className="font-sans">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Leaderboard
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          <div className="mb-6 space-y-4 bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-sans font-semibold text-base">Advanced Search</h2>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs font-sans text-muted-foreground hover:text-foreground">
                Clear Filters
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-muted-foreground">Keyword Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Name, role, company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 font-sans text-sm h-10" />
                  
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-muted-foreground">Member Grade</label>
                <Select value={activeGrade} onValueChange={setActiveGrade}>
                  <SelectTrigger className="h-10 font-sans text-sm">
                    <SelectValue placeholder="All Grades" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADES.map((grade) =>
                    <SelectItem key={grade} value={grade} className="font-sans text-sm">{grade === "All" ? "All Grades" : grade}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-muted-foreground">Country</label>
                <Select value={activeCountry} onValueChange={setActiveCountry}>
                  <SelectTrigger className="h-10 font-sans text-sm">
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) =>
                    <SelectItem key={country} value={country} className="font-sans text-sm">{country === "All" ? "All Countries" : country}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium text-muted-foreground">Primary Branch</label>
                <Select value={activeBranch} onValueChange={setActiveBranch}>
                  <SelectTrigger className="h-10 font-sans text-sm">
                    <SelectValue placeholder="All Branches" />
                  </SelectTrigger>
                  <SelectContent>
                    {BRANCHES.map((branch) =>
                    <SelectItem key={branch} value={branch} className="font-sans text-sm">{branch === "All" ? "All Branches" : branch}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="font-sans text-sm text-muted-foreground tabular-nums">
              Showing {filteredMembers.length} of {MOCK_MEMBERS.length} members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((member) =>
            <MemberCard key={member.id} member={member} />
            )}
          </div>

          {filteredMembers.length === 0 &&
          <div className="text-center py-12">
              <p className="font-mono text-sm text-muted-foreground">
                No members found matching your search criteria
              </p>
            </div>
          }
        </div>
      </div>
    </>);

}