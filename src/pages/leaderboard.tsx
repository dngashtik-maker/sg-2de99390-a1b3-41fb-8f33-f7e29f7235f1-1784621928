import { useMemo } from "react";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, ArrowLeft, TrendingUp } from "lucide-react";
import type { Member } from "@/components/MemberCard";

const MOCK_MEMBERS: Member[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Executive Director",
    category: "Staff",
    email: "s.chen@directory.org",
    phone: "+1-555-0101",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    joinDate: "2020-03-15",
    status: "Active",
    cpdPoints: 245,
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    role: "Board President",
    category: "Board",
    email: "m.rodriguez@directory.org",
    phone: "+1-555-0102",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    joinDate: "2019-01-10",
    status: "Active",
    cpdPoints: 312,
  },
  {
    id: "3",
    name: "Priya Patel",
    role: "Program Manager",
    category: "Staff",
    email: "p.patel@directory.org",
    phone: "+1-555-0103",
    photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop",
    joinDate: "2021-06-20",
    status: "Active",
    cpdPoints: 178,
  },
  {
    id: "4",
    name: "James Wilson",
    role: "Volunteer Coordinator",
    category: "Volunteer",
    email: "j.wilson@directory.org",
    phone: "+1-555-0104",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    joinDate: "2022-02-14",
    status: "Active",
    cpdPoints: 96,
  },
  {
    id: "5",
    name: "Elena Kowalski",
    role: "Communications Director",
    category: "Staff",
    email: "e.kowalski@directory.org",
    phone: "+1-555-0105",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    joinDate: "2020-09-01",
    status: "Active",
    cpdPoints: 201,
  },
  {
    id: "6",
    name: "David Okonkwo",
    role: "Treasurer",
    category: "Board",
    email: "d.okonkwo@directory.org",
    phone: "+1-555-0106",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    joinDate: "2019-05-30",
    status: "Active",
    cpdPoints: 287,
  },
  {
    id: "7",
    name: "Aisha Mohammed",
    role: "Outreach Coordinator",
    category: "Volunteer",
    email: "a.mohammed@directory.org",
    phone: "+1-555-0107",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    joinDate: "2023-01-12",
    status: "Active",
    cpdPoints: 54,
  },
  {
    id: "8",
    name: "Robert Zhang",
    role: "Secretary",
    category: "Board",
    email: "r.zhang@directory.org",
    phone: "+1-555-0108",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    joinDate: "2018-11-22",
    status: "Active",
    cpdPoints: 356,
  },
  {
    id: "9",
    name: "Linda Nguyen",
    role: "Development Manager",
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
    role: "Events Coordinator",
    category: "Volunteer",
    email: "c.mendez@directory.org",
    phone: "+1-555-0110",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
    joinDate: "2022-08-19",
    status: "Active",
    cpdPoints: 123,
  },
  {
    id: "11",
    name: "Fatima Al-Rashid",
    role: "Finance Director",
    category: "Staff",
    email: "f.alrashid@directory.org",
    phone: "+1-555-0111",
    photoUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop",
    joinDate: "2020-07-15",
    status: "Active",
    cpdPoints: 234,
  },
  {
    id: "12",
    name: "Thomas Anderson",
    role: "Board Member",
    category: "Board",
    email: "t.anderson@directory.org",
    phone: "+1-555-0112",
    photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop",
    joinDate: "2019-09-05",
    status: "Active",
    cpdPoints: 298,
  },
];

function getRankIcon(rank: number) {
  if (rank === 1) return <Trophy className="w-6 h-6 text-accent" />;
  if (rank === 2) return <Medal className="w-6 h-6 text-primary" />;
  if (rank === 3) return <Award className="w-6 h-6 text-muted-foreground" />;
  return null;
}

function getRankBadge(rank: number) {
  if (rank === 1) return "bg-accent text-accent-foreground";
  if (rank === 2) return "bg-primary text-primary-foreground";
  if (rank === 3) return "bg-muted text-muted-foreground";
  return "bg-secondary text-secondary-foreground";
}

export default function Leaderboard() {
  const rankedMembers = useMemo(() => {
    return [...MOCK_MEMBERS].sort((a, b) => b.cpdPoints - a.cpdPoints);
  }, []);

  return (
    <>
      <SEO
        title="CPD Points Leaderboard | Member Directory"
        description="View member rankings by Continuing Professional Development points"
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="font-sans mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Directory
              </Button>
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-accent" />
              <h1 className="font-sans font-bold text-3xl text-foreground">
                CPD Points Leaderboard
              </h1>
            </div>
            <p className="font-sans text-sm text-muted-foreground">
              Members ranked by Continuing Professional Development points
            </p>
          </div>

          <div className="space-y-3">
            {rankedMembers.map((member, index) => {
              const rank = index + 1;
              const icon = getRankIcon(rank);
              
              return (
                <Link key={member.id} href={`/members/${member.id}`}>
                  <Card className="group hover:border-accent transition-colors cursor-pointer p-4">
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-sm flex-shrink-0 font-sans font-bold text-lg tabular-nums ${getRankBadge(rank)}`}>
                        {icon || rank}
                      </div>
                      
                      <div className="w-16 h-16 rounded-sm overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={member.photoUrl}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-sans font-semibold text-base text-foreground truncate group-hover:text-accent transition-colors">
                          {member.name}
                        </h3>
                        <p className="font-sans text-sm text-muted-foreground truncate">
                          {member.role}
                        </p>
                        <Badge variant="secondary" className="mt-1.5 text-xs font-sans font-normal">
                          {member.category}
                        </Badge>
                      </div>

                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <div className="font-sans font-bold text-2xl text-foreground tabular-nums">
                          {member.cpdPoints}
                        </div>
                        <div className="font-sans text-xs text-muted-foreground">
                          points
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 p-4 bg-muted/50 rounded-sm border border-border">
            <p className="font-sans text-sm text-muted-foreground text-center">
              CPD points reflect members' participation in continuing professional development activities
            </p>
          </div>
        </div>
      </div>
    </>
  );
}