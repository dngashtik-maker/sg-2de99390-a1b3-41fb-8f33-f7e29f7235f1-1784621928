import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Calendar, Users, Award, Edit, TrendingUp, MapPin, Building2 } from "lucide-react";
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
    credentials: "FCIArb",
    role: "Commercial Arbitrator",
    company: "Chen Dispute Resolution",
    country: "Singapore",
    primaryBranch: "Singapore Branch",
    category: "Staff",
    email: "s.chen@ciarb-branch.org",
    phone: "+65-555-0101",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    joinDate: "2020-03-15",
    status: "Active",
    cpdPoints2024: 147,
    cpdPoints2025: 98,
    bio: "Fellow of CIArb with over 15 years of experience in international commercial arbitration. Sarah specializes in complex multi-jurisdictional disputes, particularly in technology and telecommunications sectors. She regularly sits as arbitrator in ICC, SIAC, and HKIAC proceedings.",
    committees: ["Practice & Standards", "Regional Development", "Education & Training"],
    skills: ["International Arbitration", "Commercial Disputes", "Technology Law", "ADR"],
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
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    joinDate: "2019-01-10",
    status: "Active",
    cpdPoints2024: 187,
    cpdPoints2025: 125,
    bio: "Member of CIArb specializing in construction and engineering disputes across the Middle East region. Marcus has extensive experience in FIDIC contracts and infrastructure projects, serving as both arbitrator and counsel in high-value construction arbitrations.",
    committees: ["Branch Council", "Construction Disputes", "Middle East Practice"],
    skills: ["Construction Arbitration", "Engineering Disputes", "FIDIC Contracts", "Infrastructure"],
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
    photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
    joinDate: "2021-06-20",
    status: "Active",
    cpdPoints2024: 107,
    cpdPoints2025: 71,
    bio: "Associate of CIArb practicing international commercial law with focus on dispute resolution. Priya represents clients in cross-border commercial disputes and has developed expertise in Indian arbitration law and practice under the Arbitration and Conciliation Act.",
    committees: ["Young Members Group", "South Asia Practice", "Diversity & Inclusion"],
    skills: ["Commercial Law", "Cross-border Disputes", "Indian Arbitration", "Mediation"],
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
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    joinDate: "2022-02-14",
    status: "Active",
    cpdPoints2024: 58,
    cpdPoints2025: 38,
    bio: "Member of CIArb specializing in maritime and shipping arbitration. James handles disputes arising from charterparties, bills of lading, and marine insurance. He is accredited by the London Maritime Arbitrators Association (LMAA).",
    committees: ["Maritime & Shipping", "Young Practitioners"],
    skills: ["Maritime Arbitration", "Shipping Law", "Charterparty Disputes", "Marine Insurance"],
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
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    joinDate: "2020-09-01",
    status: "Active",
    cpdPoints2024: 121,
    cpdPoints2025: 80,
    bio: "Fellow of CIArb with expertise in energy and natural resources disputes. Elena has acted as arbitrator and counsel in disputes involving oil and gas, mining, and renewable energy projects. She is particularly experienced in UNCITRAL arbitrations.",
    committees: ["Energy & Resources", "Regional Committee", "Women in Arbitration"],
    skills: ["Energy Disputes", "Mining Arbitration", "Oil & Gas", "UNCITRAL Rules"],
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
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    joinDate: "2019-05-30",
    status: "Active",
    cpdPoints2024: 172,
    cpdPoints2025: 115,
    bio: "Member of CIArb specializing in banking and finance disputes. David has extensive experience in resolving disputes arising from loan agreements, securities transactions, and financial derivatives. He serves on the board of the West Africa Branch.",
    committees: ["Branch Council", "Banking & Finance", "Africa Practice"],
    skills: ["Banking Disputes", "Finance Arbitration", "Securities Law", "Derivatives"],
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
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    joinDate: "2023-01-12",
    status: "Active",
    cpdPoints2024: 32,
    cpdPoints2025: 22,
    bio: "Associate of CIArb practicing commercial mediation in East Africa. Aisha facilitates resolution of commercial disputes through mediation and has completed CIArb's mediation training. She is building a practice focused on cross-border commercial mediation.",
    committees: ["Mediation", "East Africa Development", "Community Outreach"],
    skills: ["Commercial Mediation", "Conflict Resolution", "Cross-cultural Communication", "Facilitation"],
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
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    joinDate: "2018-11-22",
    status: "Active",
    cpdPoints2024: 214,
    cpdPoints2025: 142,
    bio: "Fellow of CIArb with specialized expertise in intellectual property and technology disputes. Robert regularly acts as arbitrator in IP, software licensing, and technology transfer disputes. He is recognized as a leading practitioner in tech-related arbitration in Asia.",
    committees: ["Branch Council", "IP & Technology", "Asia-Pacific Practice"],
    skills: ["IP Arbitration", "Technology Disputes", "Software Licensing", "Patent Law"],
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
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    joinDate: "2021-03-08",
    status: "Active",
    cpdPoints2024: 113,
    cpdPoints2025: 76,
    bio: "Member of CIArb specializing in employment and workplace disputes. Linda serves as arbitrator and mediator in employment matters, including wrongful dismissal, discrimination, and workplace harassment cases. She is committed to accessible dispute resolution.",
    committees: ["Employment & Labor", "Mediation", "Education & Training"],
    skills: ["Employment Arbitration", "Workplace Mediation", "Labor Law", "Human Rights"],
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
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    joinDate: "2022-08-19",
    status: "Active",
    cpdPoints2024: 74,
    cpdPoints2025: 49,
    bio: "Associate of CIArb developing expertise in sports arbitration. Carlos handles disputes involving athletes, clubs, and sports federations. He has completed specialized training in sports law and arbitration and aspires to serve on the Court of Arbitration for Sport.",
    committees: ["Sports Law", "Young Members Group", "European Practice"],
    skills: ["Sports Arbitration", "Athletes' Rights", "Sports Governance", "Doping Disputes"],
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
    photoUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
    joinDate: "2020-07-15",
    status: "Active",
    cpdPoints2024: 140,
    cpdPoints2025: 94,
    bio: "Fellow of CIArb specializing in Islamic finance and Shari'ah-compliant dispute resolution. Fatima has extensive experience resolving disputes arising from sukuk, murabaha, and other Islamic financial instruments. She combines expertise in Islamic law with modern arbitration practice.",
    committees: ["Islamic Finance", "Shari'ah Compliance", "Middle East Practice"],
    skills: ["Islamic Finance", "Shari'ah Law", "Sukuk Disputes", "Commercial Arbitration"],
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
    photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
    joinDate: "2019-09-05",
    status: "Active",
    cpdPoints2024: 179,
    cpdPoints2025: 119,
    bio: "Member of CIArb with expertise in international trade and investment arbitration. Thomas has acted in disputes under bilateral investment treaties (BITs) and trade agreements. He serves on the board of the North America Branch and contributes to policy development.",
    committees: ["Branch Council", "International Trade", "Investment Arbitration"],
    skills: ["Trade Arbitration", "Investment Disputes", "BIT Claims", "WTO Law"],
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
          <p className="font-sans text-sm text-muted-foreground mb-4">
            Member not found
          </p>
          <Link href="/">
            <Button variant="outline" className="font-sans text-xs">
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
        title={`${member.name} ${member.credentials} - Member Profile`}
        description={`View profile information for ${member.name}, ${member.role}`}
      />
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Link href="/">
            <Button variant="ghost" className="font-sans text-xs mb-6">
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
                  <div className="flex items-baseline gap-2 mb-2">
                    <h1 className="font-sans font-bold text-xl text-foreground">
                      {member.name}
                    </h1>
                    <span className="font-sans font-bold text-sm text-accent">
                      {member.credentials}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-foreground mb-2">
                    {member.role}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{member.company}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{member.country} • {member.primaryBranch}</span>
                  </div>
                  <Badge variant="secondary" className="font-sans text-xs">
                    {member.category}
                  </Badge>
                  <Badge
                    variant={member.status === "Active" ? "default" : "outline"}
                    className="font-sans text-xs mt-2"
                  >
                    {member.status}
                  </Badge>
                </div>

                <div className="mt-6 space-y-3 border-t border-border pt-6">
                  <div className="flex items-center gap-3 text-sm font-sans">
                    <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <a
                      href={`mailto:${member.email}`}
                      className="text-primary hover:text-accent transition-colors truncate"
                    >
                      {member.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-sans tabular-nums">
                    <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <a
                      href={`tel:${member.phone}`}
                      className="text-primary hover:text-accent transition-colors"
                    >
                      {member.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-sans tabular-nums">
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
                  <h2 className="font-sans font-bold text-sm text-foreground">
                    CPD Points
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="text-center py-3 bg-muted/30 rounded">
                    <p className="font-sans text-xs text-muted-foreground mb-1">2024</p>
                    <p className="font-sans font-bold text-3xl text-foreground tabular-nums">
                      {member.cpdPoints2024}
                    </p>
                  </div>
                  <div className="text-center py-3 bg-muted/30 rounded">
                    <p className="font-sans text-xs text-muted-foreground mb-1">2025</p>
                    <p className="font-sans font-bold text-3xl text-foreground tabular-nums">
                      {member.cpdPoints2025}
                    </p>
                  </div>
                  <div className="text-center py-3 border-t border-border pt-4">
                    <p className="font-sans text-xs text-muted-foreground mb-1">Total</p>
                    <p className="font-sans font-bold text-4xl text-accent tabular-nums">
                      {member.cpdPoints2024 + member.cpdPoints2025}
                    </p>
                  </div>
                </div>
                <p className="font-sans text-xs text-muted-foreground text-center mt-4">
                  Continuing Professional Development
                </p>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="font-sans font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Professional Profile
                </h2>
                <p className="font-sans text-sm text-foreground leading-relaxed">
                  {member.bio}
                </p>
              </Card>

              <Card className="p-6">
                <h2 className="font-sans font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Committees & Groups
                </h2>
                <div className="flex flex-wrap gap-2">
                  {member.committees.map((committee) => (
                    <Badge
                      key={committee}
                      variant="outline"
                      className="font-sans text-xs"
                    >
                      {committee}
                    </Badge>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="font-sans font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Areas of Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="font-sans text-xs"
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