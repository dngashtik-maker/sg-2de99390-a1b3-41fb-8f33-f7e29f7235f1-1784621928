import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Calendar, Users, Award, Edit, TrendingUp } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Member } from "@/components/MemberCard";

const MOCK_MEMBERS: (Member & {
  bio: string;
  committees: string[];
  skills: string[];
})[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Executive Director",
    category: "Staff",
    email: "s.chen@directory.org",
    phone: "+1-555-0101",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    joinDate: "2020-03-15",
    status: "Active",
    cpdPoints: 245,
    bio: "Sarah brings over 15 years of nonprofit leadership experience. She specializes in organizational development, strategic planning, and community engagement. Prior to joining the organization, she led initiatives at several national nonprofits.",
    committees: ["Executive Board", "Strategic Planning", "Finance"],
    skills: ["Leadership", "Strategic Planning", "Fundraising", "Public Speaking"],
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    role: "Board President",
    category: "Board",
    email: "m.rodriguez@directory.org",
    phone: "+1-555-0102",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    joinDate: "2019-01-10",
    status: "Active",
    cpdPoints: 312,
    bio: "Marcus is a corporate attorney with expertise in nonprofit governance. He has served on multiple boards and brings valuable legal and strategic insights to the organization.",
    committees: ["Executive Board", "Governance", "Legal Affairs"],
    skills: ["Legal Expertise", "Governance", "Risk Management", "Policy Development"],
  },
  {
    id: "3",
    name: "Priya Patel",
    role: "Program Manager",
    category: "Staff",
    email: "p.patel@directory.org",
    phone: "+1-555-0103",
    photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
    joinDate: "2021-06-20",
    status: "Active",
    cpdPoints: 178,
    bio: "Priya manages our flagship programs and ensures quality delivery to our community members. She has a background in social work and program evaluation.",
    committees: ["Program Committee", "Community Outreach"],
    skills: ["Program Management", "Data Analysis", "Grant Writing", "Community Engagement"],
  },
  {
    id: "4",
    name: "James Wilson",
    role: "Volunteer Coordinator",
    category: "Volunteer",
    email: "j.wilson@directory.org",
    phone: "+1-555-0104",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    joinDate: "2022-02-14",
    status: "Active",
    cpdPoints: 96,
    bio: "James coordinates our volunteer programs and manages volunteer recruitment, training, and retention. He is passionate about building strong volunteer communities.",
    committees: ["Volunteer Committee", "Events"],
    skills: ["Volunteer Management", "Training & Development", "Event Planning", "Communication"],
  },
  {
    id: "5",
    name: "Elena Kowalski",
    role: "Communications Director",
    category: "Staff",
    email: "e.kowalski@directory.org",
    phone: "+1-555-0105",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    joinDate: "2020-09-01",
    status: "Active",
    cpdPoints: 201,
    bio: "Elena leads our communications strategy across all channels. She has expertise in digital marketing, public relations, and brand development.",
    committees: ["Marketing Committee", "Digital Strategy"],
    skills: ["Digital Marketing", "Content Strategy", "Social Media", "Brand Management"],
  },
  {
    id: "6",
    name: "David Okonkwo",
    role: "Treasurer",
    category: "Board",
    email: "d.okonkwo@directory.org",
    phone: "+1-555-0106",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    joinDate: "2019-05-30",
    status: "Active",
    cpdPoints: 287,
    bio: "David is a certified public accountant who oversees the organization's financial health. He ensures fiscal responsibility and transparent financial reporting.",
    committees: ["Finance Committee", "Audit Committee"],
    skills: ["Financial Management", "Accounting", "Budget Planning", "Compliance"],
  },
  {
    id: "7",
    name: "Aisha Mohammed",
    role: "Outreach Coordinator",
    category: "Volunteer",
    email: "a.mohammed@directory.org",
    phone: "+1-555-0107",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    joinDate: "2023-01-12",
    status: "Active",
    cpdPoints: 54,
    bio: "Aisha coordinates community outreach initiatives and builds partnerships with local organizations. She is dedicated to expanding our reach and impact.",
    committees: ["Community Outreach", "Partnership Development"],
    skills: ["Community Organizing", "Partnership Building", "Cultural Competency", "Advocacy"],
  },
  {
    id: "8",
    name: "Robert Zhang",
    role: "Secretary",
    category: "Board",
    email: "r.zhang@directory.org",
    phone: "+1-555-0108",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    joinDate: "2018-11-22",
    status: "Active",
    cpdPoints: 356,
    bio: "Robert maintains official records and ensures proper documentation of all board activities. He has extensive experience in nonprofit governance and compliance.",
    committees: ["Executive Board", "Governance", "Records Management"],
    skills: ["Documentation", "Governance", "Meeting Management", "Policy Implementation"],
  },
  {
    id: "9",
    name: "Linda Nguyen",
    role: "Development Manager",
    category: "Staff",
    email: "l.nguyen@directory.org",
    phone: "+1-555-0109",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    joinDate: "2021-03-08",
    status: "Active",
    cpdPoints: 189,
    bio: "Linda leads fundraising efforts and donor relations. She has successfully secured major grants and built lasting relationships with donors and funders.",
    committees: ["Development Committee", "Fundraising Events"],
    skills: ["Fundraising", "Donor Relations", "Grant Writing", "Event Management"],
  },
  {
    id: "10",
    name: "Carlos Mendez",
    role: "Events Coordinator",
    category: "Volunteer",
    email: "c.mendez@directory.org",
    phone: "+1-555-0110",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    joinDate: "2022-08-19",
    status: "Active",
    cpdPoints: 123,
    bio: "Carlos plans and executes our signature events and fundraisers. His attention to detail and creativity make every event memorable.",
    committees: ["Events", "Volunteer Committee"],
    skills: ["Event Planning", "Logistics", "Vendor Management", "Budget Management"],
  },
  {
    id: "11",
    name: "Fatima Al-Rashid",
    role: "Finance Director",
    category: "Staff",
    email: "f.alrashid@directory.org",
    phone: "+1-555-0111",
    photoUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
    joinDate: "2020-07-15",
    status: "Active",
    cpdPoints: 234,
    bio: "Fatima manages day-to-day financial operations and works closely with the treasurer. She ensures efficient financial processes and accurate reporting.",
    committees: ["Finance Committee"],
    skills: ["Financial Operations", "Payroll", "Reporting", "Process Improvement"],
  },
  {
    id: "12",
    name: "Thomas Anderson",
    role: "Board Member",
    category: "Board",
    email: "t.anderson@directory.org",
    phone: "+1-555-0112",
    photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
    joinDate: "2019-09-05",
    status: "Active",
    cpdPoints: 298,
    bio: "Thomas is a technology executive who advises on digital transformation and IT strategy. He helps the organization leverage technology for greater impact.",
    committees: ["Technology Committee", "Strategic Planning"],
    skills: ["Technology Strategy", "Digital Transformation", "Systems Architecture", "Innovation"],
  },
];

export default function MemberProfile() {
  const router = useRouter();
  const { id } = router.query;

  const member = MOCK_MEMBERS.find((m) => m.id === id);

  if (!member) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Member not found
          </p>
          <Link href="/">
            <Button variant="outline" className="font-mono text-xs">
              <ArrowLeft className="w-3.5 h-3.5 mr-2" />
              Return to Directory
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${member.name} - Member Profile`}
        description={`View profile information for ${member.name}, ${member.role}`}
      />
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Link href="/">
            <Button variant="ghost" className="font-mono text-xs mb-6">
              <ArrowLeft className="w-3.5 h-3.5 mr-2" />
              Back to Directory
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-sm overflow-hidden bg-muted mb-4">
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="font-mono font-bold text-xl text-foreground mb-2">
                    {member.name}
                  </h1>
                  <p className="font-mono text-sm text-muted-foreground mb-3">
                    {member.role}
                  </p>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {member.category}
                  </Badge>
                  <Badge
                    variant={member.status === "Active" ? "default" : "outline"}
                    className="font-mono text-xs mt-2"
                  >
                    {member.status}
                  </Badge>
                </div>

                <div className="mt-6 space-y-3 border-t border-border pt-6">
                  <div className="flex items-center gap-3 text-sm font-mono">
                    <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <a
                      href={`mailto:${member.email}`}
                      className="text-primary hover:text-accent transition-colors truncate"
                    >
                      {member.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-mono tabular-nums">
                    <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <a
                      href={`tel:${member.phone}`}
                      className="text-primary hover:text-accent transition-colors"
                    >
                      {member.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-mono tabular-nums">
                    <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">
                      Member since {new Date(member.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <Link href={`/members/${member.id}/edit`}>
                    <Button className="w-full font-sans text-sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card className="p-6 mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <h2 className="font-mono font-bold text-sm text-foreground">
                    CPD Points
                  </h2>
                </div>
                <div className="text-center py-4">
                  <p className="font-mono font-bold text-5xl text-foreground tabular-nums">
                    {member.cpdPoints}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground mt-2">
                    Continuing Professional Development
                  </p>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="font-mono font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Bio
                </h2>
                <p className="font-mono text-sm text-foreground leading-relaxed">
                  {member.bio}
                </p>
              </Card>

              <Card className="p-6">
                <h2 className="font-mono font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Committees & Groups
                </h2>
                <div className="flex flex-wrap gap-2">
                  {member.committees.map((committee) => (
                    <Badge
                      key={committee}
                      variant="outline"
                      className="font-mono text-xs"
                    >
                      {committee}
                    </Badge>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="font-mono font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Skills & Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="font-mono text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}