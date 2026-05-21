import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
    bio: "Fellow of CIArb with over 15 years of experience in international commercial arbitration...",
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

export default function EditMember() {
  const router = useRouter();
  const { id } = router.query;

  const member = MOCK_MEMBERS.find((m) => m.id === id);

  const [formData, setFormData] = useState({
    name: member?.name || "",
    credentials: member?.credentials || "",
    role: member?.role || "",
    company: member?.company || "",
    country: member?.country || "",
    primaryBranch: member?.primaryBranch || "",
    category: member?.category || "Staff",
    email: member?.email || "",
    phone: member?.phone || "",
    bio: member?.bio || "",
    photoUrl: member?.photoUrl || "",
    joinDate: member?.joinDate || "",
    status: member?.status || "Active",
    cpdPoints2024: member?.cpdPoints2024?.toString() || "0",
    cpdPoints2025: member?.cpdPoints2025?.toString() || "0",
    skills: member?.skills?.join(", ") || "",
    committees: member?.committees?.join(", ") || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.joinDate) newErrors.joinDate = "Join date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Saving member data:", formData);
    router.push(`/members/${id}`);
  };

  const handleCancel = () => {
    router.push(`/members/${id}`);
  };

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
        title={`Edit ${member.name} - Member Profile`}
        description={`Edit profile information for ${member.name}`}
      />
      <div className="min-h-screen bg-background">
        <div className="container py-8 max-w-4xl">
          <Link href={`/members/${id}`}>
            <Button variant="ghost" className="font-sans text-xs mb-6">
              <ArrowLeft className="w-3.5 h-3.5 mr-2" />
              Back to Profile
            </Button>
          </Link>

          <Card className="p-6">
            <h1 className="font-sans font-bold text-2xl text-foreground mb-6">
              Edit Member Profile
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-sans text-sm font-semibold">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="font-sans"
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive font-sans">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="credentials" className="font-sans text-sm font-semibold">
                    Credentials *
                  </Label>
                  <Input
                    id="credentials"
                    value={formData.credentials}
                    onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                    className="font-sans"
                    placeholder="FCIArb, MCIArb, ACIArb"
                  />
                  <p className="text-xs text-muted-foreground font-sans">
                    CIArb membership grade
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="font-sans text-sm font-semibold">
                    Role/Title *
                  </Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="font-sans"
                  />
                  {errors.role && (
                    <p className="text-xs text-destructive font-sans">{errors.role}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="font-sans text-sm font-semibold">
                    Company/Organization
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="font-sans text-sm font-semibold">
                    Country
                  </Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primaryBranch" className="font-sans text-sm font-semibold">
                    Primary Branch
                  </Label>
                  <Input
                    id="primaryBranch"
                    value={formData.primaryBranch}
                    onChange={(e) => setFormData({ ...formData, primaryBranch: e.target.value })}
                    className="font-sans"
                    placeholder="e.g., London Branch, Singapore Branch"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="font-sans text-sm font-semibold">
                    Category *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value as "Staff" | "Board" | "Volunteer" })}
                  >
                    <SelectTrigger className="font-sans">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Staff" className="font-sans">Staff</SelectItem>
                      <SelectItem value="Board" className="font-sans">Board</SelectItem>
                      <SelectItem value="Volunteer" className="font-sans">Volunteer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="font-sans text-sm font-semibold">
                    Status *
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as "Active" | "Inactive" })}
                  >
                    <SelectTrigger className="font-sans">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active" className="font-sans">Active</SelectItem>
                      <SelectItem value="Inactive" className="font-sans">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-sans text-sm font-semibold">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="font-sans"
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive font-sans">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-sans text-sm font-semibold">
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="font-sans"
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive font-sans">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="joinDate" className="font-sans text-sm font-semibold">
                    Join Date *
                  </Label>
                  <Input
                    id="joinDate"
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    className="font-sans"
                  />
                  {errors.joinDate && (
                    <p className="text-xs text-destructive font-sans">{errors.joinDate}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photoUrl" className="font-sans text-sm font-semibold">
                    Photo URL
                  </Label>
                  <Input
                    id="photoUrl"
                    type="url"
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    className="font-sans"
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpdPoints2024" className="font-sans text-sm font-semibold">
                    CPD Points 2024
                  </Label>
                  <Input
                    id="cpdPoints2024"
                    type="number"
                    min="0"
                    value={formData.cpdPoints2024}
                    onChange={(e) => setFormData({ ...formData, cpdPoints2024: e.target.value })}
                    className="font-sans"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpdPoints2025" className="font-sans text-sm font-semibold">
                    CPD Points 2025
                  </Label>
                  <Input
                    id="cpdPoints2025"
                    type="number"
                    min="0"
                    value={formData.cpdPoints2025}
                    onChange={(e) => setFormData({ ...formData, cpdPoints2025: e.target.value })}
                    className="font-sans"
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground font-sans">
                    Continuing Professional Development points (admin only)
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="font-sans text-sm font-semibold">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="font-sans min-h-[120px]"
                  placeholder="Brief biography..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="committees" className="font-sans text-sm font-semibold">
                  Committees & Groups
                </Label>
                <Input
                  id="committees"
                  value={formData.committees}
                  onChange={(e) => setFormData({ ...formData, committees: e.target.value })}
                  className="font-sans"
                  placeholder="Separate with commas: Executive Board, Finance, Strategic Planning"
                />
                <p className="text-xs text-muted-foreground font-sans">
                  Separate multiple committees with commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills" className="font-sans text-sm font-semibold">
                  Skills & Expertise
                </Label>
                <Input
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="font-sans"
                  placeholder="Separate with commas: Leadership, Strategic Planning, Fundraising"
                />
                <p className="text-xs text-muted-foreground font-sans">
                  Separate multiple skills with commas
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button type="submit" className="font-sans text-sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="font-sans text-sm"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}