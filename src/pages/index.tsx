import { useState, useMemo } from "react";
import { Search, Users, TrendingUp, Settings } from "lucide-react";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { MemberCard, type Member } from "@/components/MemberCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    cpdPoints: 245,
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
    cpdPoints: 312,
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
    cpdPoints: 178,
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
    cpdPoints: 96,
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
    cpdPoints: 201,
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
    cpdPoints: 287,
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
    cpdPoints: 54,
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
    cpdPoints: 356,
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
    cpdPoints: 189,
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
    cpdPoints: 123,
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
    cpdPoints: 234,
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
    cpdPoints: 298,
  },
];

const CATEGORIES = ["All", "Staff", "Board", "Volunteer"] as const;
type Category = typeof CATEGORIES[number];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredMembers = useMemo(() => {
    return MOCK_MEMBERS.filter((member) => {
      const matchesSearch = member.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || member.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <>
      <SEO
        title="Member Directory"
        description="Browse and search our organization members"
      />
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <header className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="font-sans font-bold text-3xl text-foreground">
                    Member Directory
                  </h1>
                  <p className="font-sans text-sm text-muted-foreground mt-1">
                    CIArb Branch Members
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

          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search members by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-mono text-sm"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs text-muted-foreground uppercase">
                Filter:
              </span>
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="font-mono text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="font-mono text-sm text-muted-foreground tabular-nums">
              Showing {filteredMembers.length} of {MOCK_MEMBERS.length} members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="font-mono text-sm text-muted-foreground">
                No members found matching your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}